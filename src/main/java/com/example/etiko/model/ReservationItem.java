package com.example.etiko.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ReservationItem {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String categoryCode;

    @NotNull
    private Integer quantity;

    @NotNull
    private Integer unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}
