package com.example.goshops.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class APIResponse {
    private String messageString;
    private int statusInt;
    private Object payLoad;

    public APIResponse(String messageString, int statusInt, Object payLoad) {
        this.messageString = messageString;
        this.statusInt = statusInt;
        this.payLoad = payLoad;
    }

    public APIResponse(String messageString, int statusInt) {
        this.messageString = messageString;
        this.statusInt = statusInt;
    }
}
