package com.pavan.ems.controller;

import com.pavan.ems.entity.User;
import com.pavan.ems.repository.UserRepository;
import com.pavan.ems.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

   
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        if (userRepository.count() == 0) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }


   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {

    //System.out.println("INPUT USERNAME: " + user.getUsername());
    //System.out.println("INPUT PASSWORD: " + user.getPassword());

    User dbUser = userRepository.findByUsername(user.getUsername())
            .orElse(null);

    if (dbUser == null) {
        System.out.println("USER NOT FOUND IN DB");
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    //System.out.println("DB USER FOUND: " + dbUser.getUsername());
    //System.out.println("DB PASSWORD: " + dbUser.getPassword());

    boolean match = passwordEncoder.matches(
            user.getPassword(),
            dbUser.getPassword()
    );

    //System.out.println("PASSWORD MATCH: " + match);

    if (match) {

        String token = jwtUtil.generateToken(
                dbUser.getUsername(),
                dbUser.getRole()
        );

        return ResponseEntity.ok(token);
    }

    return ResponseEntity.status(401).body("Invalid credentials");
}
}