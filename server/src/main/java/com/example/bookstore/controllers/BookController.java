package com.example.bookstore.controllers;

import com.example.bookstore.model.Book;
import com.example.bookstore.model.BookInput;
import com.example.bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Slf4j
public class BookController {

    private final BookRepository bookRepository;

    @QueryMapping
    @GetMapping("")
    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    @QueryMapping
    public Book bookById(@Argument Integer id) {
        return bookRepository.getById(id);
    }

    @MutationMapping
    public Book createBook(@Argument String title, @Argument String author, @Argument Integer pages) {
        log.info("Creating Book using title: {}, author: {}, pages: {}", title, author, pages);
        Book book = new Book(title, author, pages);
        return bookRepository.save(book);
    }

    @MutationMapping
    public Book updateBook(@Argument BookInput bookInput) {
        return bookRepository.save(new Book(bookInput.title(), bookInput.author(), bookInput.pages()));
    }
}
