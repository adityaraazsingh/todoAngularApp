package com.todo.backend.security;

import com.todo.backend.Enum.rolesEnum;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class jwtUtil {
  private final String SECRET = "1231231231231231231231231231231231231231231";

  private Key getSignKey(){
    return Keys.hmacShaKeyFor(SECRET.getBytes());
  }

  public String generateToken(String username , rolesEnum role){
    return Jwts.builder()
      .setSubject(username)
      .claim("username", username)
      .claim("role",role)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + 1000 *60 *60))
      .signWith(getSignKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public String extractUsername(String token){
    return Jwts.parserBuilder()
      .setSigningKey(getSignKey())
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getSubject();
  }

  public boolean validateToken(String token , String username){
    return username.equals(extractUsername(token));
  }
}
