package com.example.etiko.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.OffsetDateTime;

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
    private Integer price; // regular price in KES

    // New: optional early bird price in KES
    private Integer earlyBirdPrice;

    // New: inclusive cutoff (<= this instant uses earlyBirdPrice)
    private OffsetDateTime earlyBirdUntil;

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
