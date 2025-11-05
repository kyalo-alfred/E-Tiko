package com.example.etiko.controller;

import com.example.etiko.dto.CreateReservationRequest;
import com.example.etiko.model.Event;
import com.example.etiko.model.Reservation;
import com.example.etiko.model.Ticket;
import com.example.etiko.repository.TicketRepository;
import com.example.etiko.service.EventService;
import com.example.etiko.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PublicController {
    private final EventService eventService;
    private final ReservationService reservationService;
    private final TicketRepository ticketRepository;

    @GetMapping("/events")
    public List<Event> listEvents(@RequestParam(required = false) String query) {
        return eventService.listPublished(query);
    }

    @GetMapping("/events/{eventId}")
    public Event getEvent(@PathVariable String eventId) {
        return eventService.getById(eventId);
    }

    @PostMapping("/events/{eventId}/reservations")
    public ResponseEntity<Reservation> createReservation(@PathVariable String eventId,
                                                         @Valid @RequestBody CreateReservationRequest req) {
        return ResponseEntity.ok(reservationService.createReservation(eventId, req));
    }

    @GetMapping("/reservations/{reservationId}")
    public Reservation getReservation(@PathVariable String reservationId) {
        return reservationService.getReservation(reservationId);
    }

    @PostMapping("/reservations/{reservationId}/confirm")
    public Reservation confirm(@PathVariable String reservationId) {
        return reservationService.confirmReservation(reservationId);
    }

    @GetMapping("/reservations/{reservationId}/tickets")
    public Map<String, List<Ticket>> getTickets(@PathVariable String reservationId) {
        return Map.of("tickets", ticketRepository.findByReservationId(reservationId));
    }

    @GetMapping("/reservations/{reservationId}/status")
    public Map<String, String> status(@PathVariable String reservationId) {
        return Map.of("status", reservationService.getReservation(reservationId).getStatus());
    }
}
