package com.example.etiko.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Getter @Setter
public class CreateReservationRequest {
    @NotNull public List<Item> items;
    @NotNull public BuyerInfo buyerInfo;

    @Getter @Setter
    public static class Item {
        @NotBlank public String categoryCode;
        @NotNull public Integer quantity;
    }

    @Getter @Setter
    public static class BuyerInfo {
        @NotBlank public String fullName;
        @NotBlank public String email;
        @NotBlank public String phone;
    }
}