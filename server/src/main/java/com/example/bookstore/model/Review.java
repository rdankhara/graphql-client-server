package com.example.bookstore.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    private Integer id;
    private String comment;
    private Integer rating;

    public Review(String comment, Integer rating) {
        this.comment = comment;
        this.rating = rating;
    }
}
