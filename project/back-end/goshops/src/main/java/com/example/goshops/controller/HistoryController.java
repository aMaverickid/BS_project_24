package com.example.goshops.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

import com.example.goshops.model.APIResponse;
import com.example.goshops.service.HistoryService;
import com.example.goshops.utils.Jwt;
import com.example.goshops.model.History;

@RestController
@RequestMapping("/history")
public class HistoryController {
    @Autowired
    private HistoryService historyService;

    @PostMapping("/insert")
    public ResponseEntity<APIResponse> insertHistory(@RequestParam String jwt_value, @RequestParam String search_input) {
        String name;
        LocalDateTime search_time = LocalDateTime.now();
        try {
            name = Jwt.paraJWT2name(jwt_value);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("invalid token", 200));
        }
        System.out.println("Received insert request: " + name + " " + search_input);

        // 限制搜索词长度
        if (search_input.length() > 64) {
            search_input = search_input.substring(0, 64);
        }


        // 查找是否有相同搜索记录
        if (historyService.findHistoryByInputAndName(name, search_input) != null) {
            historyService.updateHistoryTime(search_time, name, search_input);
            return ResponseEntity.ok(new APIResponse("更新搜索记录成功", 200));
        } else {
            historyService.insertHistory(name, search_input, search_time);
            return ResponseEntity.ok(new APIResponse("插入搜索记录成功", 200));            
        } 

    }

    @GetMapping("/get")
    public ResponseEntity<APIResponse> showHistories(@RequestParam String jwt_value) {
        String name;
        try {
            name = Jwt.paraJWT2name(jwt_value);
        } catch (Exception e) {
            return ResponseEntity.ok(new APIResponse("invalid token", 200));
        }

        List<History> histories = historyService.showUserHistory(name);
        
        List<String> history_input = new ArrayList<String>();
        for (History history : histories) {
            history_input.add(history.getSearch_input());
        }        
        System.out.println(history_input);
        return ResponseEntity.ok(new APIResponse("查询历史记录成功", 200, history_input));
    }
        
}
