-- V1__criar_tabelas.sql
-- Criação das tabelas usuario e funcionario

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_admissao DATE NOT NULL,
    salario NUMERIC(10, 2) NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('ATIVO', 'INATIVO'))
);

-- Índices para melhorar performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_nome ON employees(nome);