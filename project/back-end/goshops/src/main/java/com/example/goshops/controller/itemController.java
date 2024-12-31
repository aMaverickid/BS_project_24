package com.example.goshops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.example.goshops.model.APIResponse;
import com.example.goshops.model.Item;
import com.example.goshops.service.ItemService;
import com.example.goshops.utils.webCrawler.jdCrawler;
import com.example.goshops.utils.webCrawler.snCrawler;
import com.example.goshops.utils.webCrawler.dangdangCrawler;


@RestController
@RequestMapping("/item")
public class itemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/insert")
    public ResponseEntity<APIResponse> insertItem(@RequestParam String input) {
        System.out.println("Received insert request: " + input);
        snCrawler sn_crawler = new snCrawler();
        jdCrawler jdCrawler = new jdCrawler();
        dangdangCrawler dangdangCrawler = new dangdangCrawler();
    
        List<Item> temp = new ArrayList<>();
        List<Item> items = new ArrayList<>();
        try {
            temp = sn_crawler.search(input);     
            items.addAll(temp);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.ok(new APIResponse("fail on the snCrawler", 200));
        }       
        try {
            temp = dangdangCrawler.search(input);
            items.addAll(temp);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.ok(new APIResponse("fail on the jdCrawler", 200));
        }
        if (items.size() == 0) {
            return ResponseEntity.ok(new APIResponse("no items found", 200));
        }
        for (Item item : items) {            
            itemService.insertItem(item);
        }

        return ResponseEntity.ok(new APIResponse("success", 200, items));
    }

    @GetMapping("/show")
    public ResponseEntity<APIResponse> showItems(@RequestParam String name) {
        System.out.println("Received show request: " + name);
        List<Item> items = itemService.showItems(name);
        if (items.size() == 0) {
            return ResponseEntity.ok(new APIResponse("no items found", 200));
        }
        items.sort(Comparator.comparing(Item::getTime).reversed());
        return ResponseEntity.ok(new APIResponse("success", 200, items));
    }

    @GetMapping("/showhistory")
    public ResponseEntity<APIResponse> showHistoryItems(@RequestParam String name) {
        System.out.println("Received show history request: " + name);
        List<Item> items = itemService.showItems(name);
        if (items.size() == 0) {
            return ResponseEntity.ok(new APIResponse("no items found", 200));
        }
        items.sort(Comparator.comparing(Item::getTime).reversed());
        return ResponseEntity.ok(new APIResponse("success", 200, items));
    }
    
    @GetMapping("/findminprice")
    public ResponseEntity<APIResponse> findMinPriceItem(@RequestParam String name) {
        System.out.println("Received find min price request: " + name);
        Item item = itemService.findMinPriceItem(name);
        if (item == null) {
            return ResponseEntity.ok(new APIResponse("no items found", 200));
        }
        return ResponseEntity.ok(new APIResponse("success", 200, item));
    }
}
