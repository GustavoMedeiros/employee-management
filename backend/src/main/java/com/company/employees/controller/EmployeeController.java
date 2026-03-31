package com.company.employees.controller;

import com.company.employees.dto.EmployeeDTO;
import com.company.employees.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> listarTodos() {
        return ResponseEntity.ok(employeeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(employeeService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> criar(@Valid @RequestBody EmployeeDTO dto) {
        EmployeeDTO created = employeeService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
        try {
            return ResponseEntity.ok(employeeService.atualizar(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            employeeService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<EmployeeDTO> alternarStatus(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(employeeService.alternarStatus(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}