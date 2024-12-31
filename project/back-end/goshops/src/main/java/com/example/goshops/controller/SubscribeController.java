package com.example.goshops.controller;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

import com.example.goshops.model.APIResponse;
import com.example.goshops.repository.SubscribeRepository;
import com.example.goshops.utils.Jwt;
import com.example.goshops.model.Subscribee;    

@RestController
@RequestMapping("/subscribe")
public class SubscribeController {
    @Autowired
    private SubscribeRepository subscribeRepository;

    @PostMapping("/insert")
    public ResponseEntity<APIResponse> insertSubscribe(@RequestParam String jwt_value, @RequestParam String description, @RequestParam Double price, @RequestParam LocalDateTime time, @RequestParam String platform, @RequestParam String shop_name) {
        String name;
        try {
            name = Jwt.paraJWT2name(jwt_value);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("invalid token", 200));
        }
        System.out.println("Received insert request: " + name + " " + description + " " + price + " " + time + " " + platform + " " + shop_name);
        try {
            if  (!subscribeRepository.findSubscribeeByNameandDescription(name, description).isEmpty()) {
                return ResponseEntity.ok(new APIResponse("已经订阅过该商品", 200));
            }

            Subscribee subscribee = new Subscribee();
            subscribee.setName(name);
            subscribee.setDescription(description);
            subscribee.setPrice(price);
            subscribee.setTime(time);
            subscribee.setPlatform(platform);
            subscribee.setShop_name(shop_name);
            subscribeRepository.insertNewSubscribee(subscribee);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.ok(new APIResponse("插入订阅记录失败", 200));
        }
        return ResponseEntity.ok(new APIResponse("success", 200));
    }

    @GetMapping("/get")
    public ResponseEntity<APIResponse> showSubscribes(@RequestParam String jwt_value) {
        String name;
        try {
            name = Jwt.paraJWT2name(jwt_value);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("invalid token", 200));
        }
        System.out.println("Received show request: " + name);
        List<Subscribee> subscribees = subscribeRepository.findSubscribeeByName(name);
        if (subscribees.size() == 0) {
            return ResponseEntity.ok(new APIResponse("no items found", 200));
        }
        subscribees.sort(Comparator.comparing(Subscribee::getTime).reversed());
        return ResponseEntity.ok(new APIResponse("success", 200, subscribees));
    }


    @DeleteMapping("/delete")
    public ResponseEntity<APIResponse> deleteSubscribe(@RequestParam String jwt_value, @RequestParam String description) {
        String name;
        try {
            name = Jwt.paraJWT2name(jwt_value);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("invalid token", 200));
        }
        System.out.println("Received delete request: " + name + " " + description);
        try {
            subscribeRepository.deleteSubscribee(name, description);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("删除订阅记录失败", 200));
        }
        return ResponseEntity.ok(new APIResponse("success", 200));
    }

}
