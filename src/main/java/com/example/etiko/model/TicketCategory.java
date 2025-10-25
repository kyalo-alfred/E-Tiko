package com.example.etiko.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TicketCategory {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String code; // VIP, REGULAR

    @NotBlank
    private String name;

    @NotNull
    private Integer price; // in KES

    @NotNull
    private Integer capacity;

    @NotNull
    @Builder.Default
    private Integer sold = 0;

    @NotNull
    @Builder.Default
    private Integer limitPerUser = 4;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    private Event event;
}