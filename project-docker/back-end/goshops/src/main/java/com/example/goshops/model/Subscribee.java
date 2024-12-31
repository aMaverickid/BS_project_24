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
public class Subscribee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(length = 128, nullable = false)
    String name;
    @Column(length = 512, nullable = false)
    String description;
    @Column(nullable = false)
    Double price;
    @Column(nullable = false)
    LocalDateTime time;
    @Column(length = 128, nullable = false)
    String platform;
    @Column(length = 128)
    String shop_name; 
}
