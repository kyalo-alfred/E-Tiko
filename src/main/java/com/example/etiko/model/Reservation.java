package com.example.etiko.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    private String eventId;

    @NotBlank
    private String buyerFullName;

    @NotBlank
    private String buyerEmail;

    @NotBlank
    private String buyerPhone;

    @NotNull
    private Integer totalAmount;

    @NotNull
    private OffsetDateTime expiresAt;

    @NotBlank
    private String status; // PENDING_PAYMENT | CONFIRMED | EXPIRED | CANCELLED

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ReservationItem> items = new ArrayList<>();
}
