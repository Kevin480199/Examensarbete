package org.example.secondhandwebshop.service;

import org.example.secondhandwebshop.model.User;
import org.example.secondhandwebshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    public String loginWithGoogle(String idToken) {
        var payload = googleAuthService.verifyToken(idToken);

        if (payload == null) {
            throw new RuntimeException("Invalid Google ID token");
        }

        String email = payload.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName((String) payload.get("name"));
                    newUser.setPictureUrl((String) payload.get("picture"));
                    newUser.setGoogleId((String) payload.get("sub"));
                    return userRepository.save(newUser);
                });

        return jwtService.generateToken(user);
    }
}

