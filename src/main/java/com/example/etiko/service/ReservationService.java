package com.example.etiko.service;


import com.example.etiko.dto.CreateReservationRequest;
import com.example.etiko.model.*;
import com.example.etiko.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service @RequiredArgsConstructor
public class ReservationService {
    private final EventRepository eventRepository;
    private final TicketCategoryRepository categoryRepository;
    private final ReservationRepository reservationRepository;
    private final TicketRepository ticketRepository;

    @Transactional
    public Reservation createReservation(String eventId, CreateReservationRequest req) {
        Event event = eventRepository.findById(eventId).orElseThrow();

        int total = 0;
        Reservation reservation = Reservation.builder()
            .eventId(event.getId())
            .buyerFullName(req.buyerInfo.fullName)
            .buyerEmail(req.buyerInfo.email)
            .buyerPhone(req.buyerInfo.phone)
            .status("PENDING_PAYMENT")
            .expiresAt(OffsetDateTime.now().plusMinutes(15))
            .totalAmount(0)
            .build();

        OffsetDateTime now = OffsetDateTime.now();

        for (CreateReservationRequest.Item item : req.items) {
            TicketCategory category = categoryRepository.findByEvent_IdAndCode(event.getId(), item.categoryCode);
            if (category == null) throw new IllegalArgumentException("Category not found");
            if (item.quantity <= 0) throw new IllegalArgumentException("Quantity must be > 0");

            int remaining = category.getCapacity() - category.getSold();
            if (item.quantity > remaining) throw new IllegalArgumentException("Insufficient inventory");
            if (item.quantity > category.getLimitPerUser()) throw new IllegalArgumentException("Exceeds per-user limit");

            int unitPrice = computeEffectivePrice(category, now);
            total += item.quantity * unitPrice;

            ReservationItem ri = ReservationItem.builder()
                .categoryCode(category.getCode())
                .quantity(item.quantity)
                .unitPrice(unitPrice)
                .reservation(reservation)
                .build();
            reservation.getItems().add(ri);
        }

        reservation.setTotalAmount(total);
        return reservationRepository.save(reservation);
    }

    private int computeEffectivePrice(TicketCategory category, OffsetDateTime now) {
        if (category.getEarlyBirdPrice() != null && category.getEarlyBirdUntil() != null) {
            if (!now.isAfter(category.getEarlyBirdUntil())) { // now <= earlyBirdUntil
                return category.getEarlyBirdPrice();
            }
        }
        return category.getPrice();
    }

    @Transactional
    public Reservation confirmReservation(String reservationId) {
        Reservation res = reservationRepository.findById(reservationId).orElseThrow();
        if (!"PENDING_PAYMENT".equals(res.getStatus())) return res;
        // allocate tickets and increase sold
        for (ReservationItem item : res.getItems()) {
            TicketCategory category = categoryRepository.findByEvent_IdAndCode(res.getEventId(), item.getCategoryCode());
            category.setSold(category.getSold() + item.getQuantity());
            categoryRepository.save(category);

            for (int i = 0; i < item.getQuantity(); i++) {
                ticketRepository.save(Ticket.builder()
                    .eventId(res.getEventId())
                    .reservationId(res.getId())
                    .categoryCode(item.getCategoryCode())
                    .build());
            }
        }
        res.setStatus("CONFIRMED");
        return reservationRepository.save(res);
    }
}
