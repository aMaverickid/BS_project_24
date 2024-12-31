package com.example.goshops.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(length = 128, nullable = false, unique = true)
    String name;
    @Column(length = 128, nullable = false)
    String search_input;
    @Column(nullable = false, unique = true)
    LocalDateTime search_time;
}
