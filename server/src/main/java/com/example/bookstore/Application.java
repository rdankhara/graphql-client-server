package com.example.bookstore;

import com.example.bookstore.model.Book;
import com.example.bookstore.model.Review;
import com.example.bookstore.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@Slf4j
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner (BookRepository bookRepository) {
        return args -> {
            log.info("Initialising h2 db");
            Review review = new Review(1,"Thriller", 4);
            Book book = new Book("Spring Java", "John Kennedy", 500);
            book.setReviews(List.of(review));
            bookRepository.save(book);
            log.info("Books count: {}", bookRepository.count());
        };
    }
}
