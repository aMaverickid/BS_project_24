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
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;    
    @Column(nullable = false)
    Double price;
    @Column(length = 512, nullable = false)
    String description;
    @Column(length = 256)
    String img;
    @Column(length = 128)
    String category;
    @Column(nullable = false, unique = true)
    LocalDateTime time;
    @Column(length = 128)
    String shop_name;    
    @Column(length = 128, nullable = false)
    String platform;
    @Column(length =  2048)
    String detail_url;
}