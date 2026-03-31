package com.company.employees.service;

import com.company.employees.config.JwtTokenProvider;
import com.company.employees.dto.LoginRequest;
import com.company.employees.dto.LoginResponse;
import com.company.employees.entity.User;
import com.company.employees.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request) {
        User usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!usuario.getAtivo()) {
            throw new RuntimeException("Usuário inativo");
        }

        if (!passwordEncoder.matches(request.getPassword(), usuario.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = jwtTokenProvider.generateToken(usuario.getId(), usuario.getEmail());

        return LoginResponse.builder()
                .token(token)
                .tipo("Bearer")
                .id(usuario.getId())
                .nome(usuario.getNome())
                .email(usuario.getEmail())
                .build();
    }
}