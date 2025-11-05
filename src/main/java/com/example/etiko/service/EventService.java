package com.example.etiko.service;

import com.example.etiko.dto.CreateEventRequest;
import com.example.etiko.model.Event;
import com.example.etiko.model.TicketCategory;
import com.example.etiko.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    @Transactional
    public Event createEvent(CreateEventRequest req) {
        Event event = Event.builder()
            .title(req.title).venue(req.venue)
            .startDateTime(req.startDateTime).endDateTime(req.endDateTime)
            .status(req.status)
            .build();

        List<TicketCategory> categories = req.categories.stream().map(c ->
            TicketCategory.builder()
                .code(c.code)
                .name(c.name)
                .price(c.price)
                .earlyBirdPrice(c.earlyBirdPrice)
                .earlyBirdUntil(c.earlyBirdUntil)
                .capacity(c.capacity)
                .limitPerUser(c.limitPerUser)
                .event(event)
                .build()
        ).toList();

        event.setCategories(categories);
        return eventRepository.save(event);
    }

    public List<Event> listPublished(String q) {
        return eventRepository.searchPublished(q);
    }

    public Event getById(String id) {
        return eventRepository.findById(id).orElseThrow();
    }
}
