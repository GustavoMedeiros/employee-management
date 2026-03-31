package com.company.employees.service;

import com.company.employees.dto.EmployeeDTO;
import com.company.employees.entity.Employee;
import com.company.employees.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<EmployeeDTO> listarTodos() {
        return employeeRepository.findAllByOrderByNomeAsc()
                .stream()
                .map(EmployeeDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public EmployeeDTO buscarPorId(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        return EmployeeDTO.fromEntity(employee);
    }

    @Transactional
    public EmployeeDTO criar(EmployeeDTO dto) {
        Employee employee = dto.toEntity();
        employee.setId(null);
        Employee saved = employeeRepository.save(employee);
        return EmployeeDTO.fromEntity(saved);
    }

    @Transactional
    public EmployeeDTO atualizar(Long id, EmployeeDTO dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        employee.setNome(dto.getNome());
        employee.setDataAdmissao(dto.getDataAdmissao());
        employee.setSalario(dto.getSalario());
        employee.setStatus(dto.getStatus());

        Employee updated = employeeRepository.save(employee);
        return EmployeeDTO.fromEntity(updated);
    }

    @Transactional
    public void deletar(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Funcionário não encontrado");
        }
        employeeRepository.deleteById(id);
    }

    @Transactional
    public EmployeeDTO alternarStatus(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        if (employee.getStatus() == Employee.StatusEmployee.ATIVO) {
            employee.setStatus(Employee.StatusEmployee.INATIVO);
        } else {
            employee.setStatus(Employee.StatusEmployee.ATIVO);
        }

        Employee updated = employeeRepository.save(employee);
        return EmployeeDTO.fromEntity(updated);
    }
}