package com.example.goshops.utils;

import java.util.Base64;
import java.util.Date;
import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

import com.alibaba.fastjson.JSONObject;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class Jwt {

    static final String security = "goshops";
    static final long expire_time = 600000;
    // 解析 JWT
    public static String paraJWT2code(String jsonWebToken) {
        return JSONObject.parseObject(paraJWT(jsonWebToken).get("sub").toString()).get("code").toString();
    }

    public static String paraJWT2email(String jsonWebToken) {
        return JSONObject.parseObject(paraJWT(jsonWebToken).get("sub").toString()).get("email").toString();
    }

    public static String paraJWT2name(String jsonWebToken) {
        return JSONObject.parseObject(paraJWT(jsonWebToken).get("sub").toString()).get("name").toString();
    }

    public static String paraJWT2id(String jsonWebToken) {
        return JSONObject.parseObject(paraJWT(jsonWebToken).get("sub").toString()).get("id").toString();
    }

    public static Claims paraJWT(String jsonWebToken) {

        return Jwts.parser().setSigningKey(Base64.getDecoder().decode(security))
                .parseClaimsJws(jsonWebToken).getBody();
    }

    // 前三个参数为自己用户token的一些信息比如id，权限，名称等。
    // 不要将隐私信息放入（大家都可以获取到）
    /**
     * 其实生成的token 就是一个字符串
     * @param args1 User.name/User.email
     * @param args2 User.password/Email.code
     */
    public static String createJWT(String type, String args1, String args2) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // 生成签名密钥 就是一个base64加密后的字符串
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JSONObject jsonObject = new JSONObject();
        if (type.equals("login")) {
            jsonObject.put("name", args1);
            jsonObject.put("password", args2);
        } else if (type.equals("email")) {
            jsonObject.put("email", args1);
            jsonObject.put("code", args2);
        }
        // 添加构成JWT的参数
        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT").setIssuedAt(now) // 创建时间
                .setSubject(jsonObject.toString()) // 主题，也差不多是个人的一些信息
                .signWith(signatureAlgorithm, signingKey); // 估计是第三段密钥
        // 添加Token过期时间
        if (expire_time >= 0) {
            // 过期时间
            long expMillis = nowMillis + expire_time;
            // 现在是什么时间
            Date exp = new Date(expMillis);
            // 系统时间之前的token都是不可以被承认的
            builder.setExpiration(exp).setNotBefore(now);
        }
        // 生成JWT
        return builder.compact();
    }
    
}
