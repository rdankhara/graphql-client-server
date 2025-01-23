package com.example.bookstore.controllers;

import com.example.bookstore.model.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.graphql.test.tester.GraphQlTester;

import static org.junit.jupiter.api.Assertions.*;

@GraphQlTest(BookController.class)
class BookControllerTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void canGetBooks() {
        graphQlTester
                .documentName("books")
                .execute()
                .path("getAllBooks")
                .entityList(Book.class)
                .hasSize(1);
    }

    @Test
    void createBook() {
    }

    @Test
    void updateBook() {
    }
}
