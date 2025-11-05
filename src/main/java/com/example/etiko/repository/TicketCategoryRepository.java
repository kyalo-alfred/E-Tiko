package com.example.etiko.repository;

import com.example.etiko.model.TicketCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory, String> {
    List<TicketCategory> findByEvent_Id(String eventId);
    TicketCategory findByEvent_IdAndCode(String eventId, String code);
}
