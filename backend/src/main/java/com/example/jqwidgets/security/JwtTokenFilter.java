package com.example.jqwidgets.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    // Utilisation de la même clé secrète pour la signature du JWT
    private static final String SECRET_KEY = "mySuperSecretKeyForJWTValidation"; // Utilisez la même clé partout

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Récupérer le token dans l'en-tête Authorization
        String token = request.getHeader("Authorization");

        // Vérifier que le token commence par "Bearer "
        if (token != null && token.startsWith("Bearer ")) {
            try {
                // Extraire le token sans "Bearer "
                token = token.substring(7);
                
                // Extraire les informations (claims) du JWT
                Claims claims = Jwts.parserBuilder()
                    .setSigningKey(new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
                
                // Créer un objet d'authentification basé sur les informations du token
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        claims.getSubject(), null, new ArrayList<>());
                
                // Placer l'authentification dans le SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // Afficher l'exception complète dans les logs pour plus d'informations
                e.printStackTrace();

                // Retourner une erreur 401 (Unauthorized) avec un message explicite
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setHeader("WWW-Authenticate", "Bearer realm=\"Access to the API\", error=\"invalid_token\"");
                return;
            }
        } else {
            // Log si le token n'est pas présent ou mal formé
            logger.warn("Authorization header is missing or does not start with Bearer");
        }

        // Continuez le filtrage de la chaîne de filtres
        filterChain.doFilter(request, response);
    }
}
