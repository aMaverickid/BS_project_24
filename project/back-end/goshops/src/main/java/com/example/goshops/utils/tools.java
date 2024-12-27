package com.example.goshops.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class tools {

    public static String sha256(String input) {
        try {
            // 获取SHA-256消息摘要实例
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 计算输入字符串的SHA-256哈希值
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));

            // 将字节数组转换为十六进制字符串
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}