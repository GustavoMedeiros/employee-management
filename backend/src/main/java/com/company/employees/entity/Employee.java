package com.company.employees.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(name = "data_admissao", nullable = false)
    private LocalDate dataAdmissao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal salario;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusEmployee status;

    public enum StatusEmployee {
        ATIVO, INATIVO
    }
}