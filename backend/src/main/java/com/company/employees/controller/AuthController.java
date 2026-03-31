package com.company.employees.controller;

import com.company.employees.dto.LoginRequest;
import com.company.employees.dto.LoginResponse;
import com.company.employees.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

        @PostMapping("/login")
        public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateToken() {
        return ResponseEntity.ok(Map.of("valid", true));
    }
}