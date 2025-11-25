package org.example.secondhandwebshop.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.example.secondhandwebshop.model.User;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET = "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";

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("name", user.getName())
                .claim("id", user.getId())
                .claim("admin", user.getAdmin())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();
    }
}

