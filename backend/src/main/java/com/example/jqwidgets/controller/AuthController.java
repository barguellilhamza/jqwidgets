package com.example.jqwidgets.controller;

import com.example.jqwidgets.model.AppUser;
import com.example.jqwidgets.repository.UserRepository;
import com.example.jqwidgets.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository; // Utilisation du repository pour accéder à la DB

    @Autowired
    private JwtTokenUtil jwtTokenUtil; // Utilisation du utilitaire JWT pour générer un token

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Utilisation du BCrypt pour la comparaison des mots de passe

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        // Recherche de l'utilisateur dans la base de données
        Optional<AppUser> optionalUser = Optional.ofNullable(userRepository.findByUsername(username));
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();

            // Vérifie si le mot de passe correspond à celui de la base de données
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Si le mot de passe est valide, on génère un JWT
                String token = jwtTokenUtil.generateToken(username);

                // Retourne le token dans la réponse
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return response;
            } else {
                // Si le mot de passe est incorrect
                throw new RuntimeException("Invalid password");
            }
        } else {
            // Si l'utilisateur n'existe pas
            throw new RuntimeException("User not found");
        }
    }
}
