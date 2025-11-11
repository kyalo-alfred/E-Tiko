package com.example.etiko.repository;

import com.example.etiko.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findByReservationId(String reservationId);
}