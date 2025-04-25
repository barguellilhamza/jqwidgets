package com.example.jqwidgets.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.util.ArrayList;
import java.util.Date;

@Component
public class JwtTokenUtil {

    // Utilisation de la même clé secrète partout
    private static final String SECRET_KEY = "mySuperSecretKeyForJWTValidation"; // Utiliser la même clé partout
    
    // Durée de validité du token (1 heure)
    private long expirationTime = 3600000L; 

    // Méthode pour générer un token JWT
    public static String generateToken(String username) {
        // Utilisez la clé secrète partagée pour la signature
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName());
        
        // Génération du JWT avec la clé
        return Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + 3600000L)) // 1 heure d'expiration
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact();
    }

    // Méthode pour valider un token JWT
    public boolean validateToken(String token) {
        try {
            // Vérification de la signature et de l'expiration
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extraire le nom d'utilisateur du token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY.getBytes())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    // Cette méthode peut être utilisée pour récupérer l'authentification à partir du token
    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        String username = getUsernameFromToken(token);
        return new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
    }
}
