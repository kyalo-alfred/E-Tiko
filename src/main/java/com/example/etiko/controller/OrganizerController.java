package com.example.etiko.controller;

import com.example.etiko.dto.CreateEventRequest;
import com.example.etiko.model.Event;
import com.example.etiko.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/organizer")
@RequiredArgsConstructor
public class OrganizerController {
    private final EventService eventService;

    @PostMapping("/events")
    public ResponseEntity<Event> create(@Valid @RequestBody CreateEventRequest req) {
        return ResponseEntity.ok(eventService.createEvent(req));
    }
}
