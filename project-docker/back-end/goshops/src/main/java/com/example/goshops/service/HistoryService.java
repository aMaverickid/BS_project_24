package com.example.goshops.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

import com.example.goshops.model.History;
import com.example.goshops.repository.HistoryRepository;
@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;
    
    // 插入搜索记录
    public void insertHistory(String name, String search_input, LocalDateTime search_time) {
        History history = new History(0, name, search_input, search_time);
        historyRepository.insertNewHistory(history);
    }

    // 更新搜索记录时间
    public void updateHistoryTime(LocalDateTime search_time, String name, String search_input) {
        historyRepository.UpdateHistoryTimeByInput(search_time, name, search_input);
    }

    // 查找搜索记录
    public History findHistoryByInputAndName(String name, String search_input) {
        return historyRepository.findHistoryByInputAndName(name, search_input);
    }

    // 查找用户搜索记录
    public List<History> showUserHistory(String name) {
        return historyRepository.findHistoryByAccount(name);
    }
}
