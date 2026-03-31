-- V2__seed_dados.sql
-- Inserção de dados iniciais: 1 admin user e 1 funcionário exemplo

-- Senha: admin123 (BCrypt hash)
INSERT INTO users (email, senha, nome, ativo)
VALUES ('admin@empresa.com', '$2a$12$DgmIrUlvPYYDuZorGg9VIuVb3Dg97Cx.Y5ZqCVVF.W3az9OF4YQ9K', 'Administrador', TRUE);

-- Funcionário exemplo
INSERT INTO employees (nome, data_admissao, salario, status)
VALUES ('João da Silva', '2023-01-15', 5500.00, 'ATIVO');