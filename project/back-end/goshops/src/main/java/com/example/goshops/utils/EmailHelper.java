package com.example.goshops.utils;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

import java.util.Random;

public class EmailHelper {

    public static void email_sender(String target_email, String text, String subject) {
        // 配置邮件服务器
        String host = "smtp.163.com";
        String username = "amaverickid@163.com"; // 邮箱地址
        String password = "UB5Xg48K3HDnBcWw"; // 邮箱授权码

        // 配置邮件属性
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        // props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "465");

        // 创建会话
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        try {
            // 创建邮件消息
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(target_email));
            message.setSubject(subject);
            message.setText(text);

            // 发送邮件
            Transport.send(message);
            System.out.println("验证码已发送至 " + target_email);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // 返回的是加密后的验证码
    public static String code_sender(String target_email) {
        Random random = new Random();
        String code = String.format("%06d", random.nextInt(1000000));

        String encoded_code = tools.sha256(code);
        System.out.println(encoded_code);
        String text = "【Goshops】 您的验证码是: " + code;
        String subject = "Goshops：验证码";

        email_sender(target_email, text, subject);

        return encoded_code;
    }
}
