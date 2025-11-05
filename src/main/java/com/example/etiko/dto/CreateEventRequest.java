package com.example.etiko.dto;


import jakarta.validation.constraints.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter @Setter
public class CreateEventRequest {
    @NotBlank public String title;
    @NotBlank public String venue;
    @NotNull public OffsetDateTime startDateTime;
    @NotNull public OffsetDateTime endDateTime;
    @NotBlank public String status; // DRAFT or PUBLISHED

    @NotNull public List<CategoryDto> categories;

    @Getter @Setter
    public static class CategoryDto {
        @NotBlank public String code;
        @NotBlank public String name;
        @NotNull public Integer price;              // regular price
        public Integer earlyBirdPrice;              // optional
        public OffsetDateTime earlyBirdUntil;       // optional
        @NotNull public Integer capacity;
        @NotNull public Integer limitPerUser;
    }
}
