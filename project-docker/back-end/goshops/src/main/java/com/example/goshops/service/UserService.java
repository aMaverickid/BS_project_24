package com.example.goshops.service;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.example.goshops.model.User;
import com.example.goshops.repository.UserRepository;
import com.example.goshops.utils.*;;
@Service
public class UserService {
    
    @Autowired
    // 数据库操作
    private UserRepository userRepository;

    // login
    public boolean login(String name, String password) {
        String passwordInDB = userRepository.getPasswordByAccount(name);
        if (passwordInDB == null) {
            return false;
        }
        return passwordInDB.equals(tools.sha256(password));
    }

    // register
    public String find_name_by_name(String name) {
        return userRepository.getNameByName(name);
    } 

    public String find_email_by_email(String email) {
        return userRepository.getEmailByEmail(email);
    }

    public String find_email_by_name(String name) {
        System.out.println("name: " + name);
        return userRepository.getEmailByName(name);
    }

    public User find_user_by_name(String name) {
        return userRepository.getUserByAccount(name);
    }

    public void register (User user) {
        userRepository.insertUser(user);
    }


}
