package com.example.goshops.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

// import javax.validation.constraints.Email;
// import javax.ws.rs.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestBody;

import com.example.goshops.model.APIResponse;
import com.example.goshops.model.User;
import com.example.goshops.service.UserService;

import com.example.goshops.utils.*;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService UserService;

    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(@RequestParam String name, @RequestParam String password) {
        System.out.println("Received login request: " + name + " " + password);
        if (UserService.login(name, password)) {
            String jwtValue = Jwt.createJWT("login", name, password);
            return ResponseEntity.ok(new APIResponse("登录成功", 200, jwtValue));
        } else {                        
            return ResponseEntity.ok(new APIResponse("密码错误或用户不存在", 200));
        }
    }
    @GetMapping("/sendCode")
    public ResponseEntity<APIResponse> sendCode(@RequestParam String email) {
        String emailInDB = UserService.find_email_by_email(email);
        if (emailInDB != null) {
            System.out.println("邮箱已被注册");
            return ResponseEntity.ok(new APIResponse("邮箱已被注册", 200));
        }         
        if (isInvalidEmail(email)) {
            System.out.println("邮箱格式错误");
            return ResponseEntity.ok(new APIResponse("邮箱格式错误", 200));
        } else {
            String code = EmailHelper.code_sender(email);
            String jwtValue = Jwt.createJWT("email", email, code);
            APIResponse response = new APIResponse("验证码已发送至" + email, 200, jwtValue); 
            return ResponseEntity.ok(response);
        }            
    }
    
    public boolean isInvalidEmail(String email) {
        String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return !matcher.matches();
    }

    @PostMapping("/register")
    public ResponseEntity<APIResponse> register(@RequestParam String name, @RequestParam String password, @RequestParam String email,
        @RequestParam String code, @RequestParam String jwtValue) {
            User userInDB = UserService.find_user_by_name(name);
            if (userInDB != null) {
                return ResponseEntity.ok(new APIResponse("用户名已被注册", 200));
            }

            try {
                if (!Jwt.paraJWT2code(jwtValue).equals(tools.sha256(code))) {
                    return ResponseEntity.ok(new APIResponse("验证码错误", 200));
                }
            } catch (Exception e) {
                return ResponseEntity.ok(new APIResponse("验证码失效，请重新发送", 200));
            }

            User user = new User(0, name, tools.sha256(password), email);
            UserService.register(user);
            return ResponseEntity.ok(new APIResponse("注册成功", 200));
            
        }
    
}
