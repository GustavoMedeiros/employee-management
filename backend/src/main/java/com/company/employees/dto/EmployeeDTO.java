package com.company.employees.dto;

import com.company.employees.entity.Employee;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotNull(message = "Data de admissão é obrigatória")
    @PastOrPresent(message = "Data de admissão não pode ser futura")
    private LocalDate dataAdmissao;

    @NotNull(message = "Salário é obrigatório")
    @DecimalMin(value = "0.01", message = "Salário deve ser maior que zero")
    private BigDecimal salario;

    @NotNull(message = "Status é obrigatório")
    private Employee.StatusEmployee status;

    public static EmployeeDTO fromEntity(Employee employee) {
        return EmployeeDTO.builder()
                .id(employee.getId())
                .nome(employee.getNome())
                .dataAdmissao(employee.getDataAdmissao())
                .salario(employee.getSalario())
                .status(employee.getStatus())
                .build();
    }

    public Employee toEntity() {
        return Employee.builder()
                .id(this.id)
                .nome(this.nome)
                .dataAdmissao(this.dataAdmissao)
                .salario(this.salario)
                .status(this.status)
                .build();
    }
}