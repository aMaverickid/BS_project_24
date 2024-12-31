package com.example.goshops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.goshops.repository.ItemRepository;
import com.example.goshops.model.Item;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public void insertItem(Item item) {
        itemRepository.InsertItem(item);
    }

    public List<Item> showItems(String name) {
        return itemRepository.findItemByName(name);
    }
}
