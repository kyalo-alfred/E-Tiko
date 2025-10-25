package com.example.etiko.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String eventId;

    @NotBlank
    private String reservationId;

    @NotBlank
    private String categoryCode;

    @Builder.Default
    private boolean checkedIn = false;
}