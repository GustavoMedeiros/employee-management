# Sistema de Gerenciamento de Funcionários

Sistema Full Stack para gerenciamento de funcionários desenvolvido como teste prático para desenvolvedor Java Web.

## Tecnologias Utilizadas

### Backend
- **Java 17** - Linguagem de programação
- **Spring Boot 3.2** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Security** - Autenticação e autorização
- **FlywayDB** - Versionamento de banco de dados
- **JWT (JSON Web Token)** - Autenticação stateless
- **BCrypt** - Criptografia de senhas
- **Maven** - Gerenciamento de dependências

### Frontend
- **React.js 19** - Biblioteca para interface do usuário
- **React Router DOM** - Navegação SPA
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

### Banco de Dados
- **PostgreSQL 16** - Banco de dados relacional

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Servidor web para o frontend

## Pré-requisitos

Para executar este projeto, você precisa ter instalado:

- **Docker** (versão 20.10+)
- **Docker Compose** (versão 2.0+)

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/funcionarios-app.git
   cd funcionarios-app
   ```

2. **Execute o Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Aguarde todos os serviços iniciarem.** O backend aguardará automaticamente o banco de dados estar pronto antes de iniciar.

4. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Credenciais de Acesso

Use as seguintes credenciais para fazer login no sistema:

| Campo | Valor |
|-------|-------|
| **Email** | `admin@empresa.com` |
| **Senha** | `admin123` |

Estas credenciais são criadas automaticamente pelo FlywayDB durante a inicialização do sistema.

## Estrutura do Projeto

```
├── backend-java/                 # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/empresa/funcionarios/
│   │   │   │   ├── config/       # Configurações (Security, JWT, CORS)
│   │   │   │   ├── controller/   # Controllers REST
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   ├── entity/       # Entidades JPA
│   │   │   │   ├── repository/   # Repositórios Spring Data
│   │   │   │   └── service/      # Camada de serviço
│   │   │   └── resources/
│   │   │       ├── db/migration/ # Migrations FlywayDB
│   │   │       └── application.properties
│   │   └── Dockerfile
│   └── pom.xml
├── frontend/                     # Frontend React.js
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── context/              # Contextos React (Auth)
│   │   ├── pages/                # Páginas da aplicação
│   │   └── services/             # Serviços de API
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml            # Orquestração dos containers
```

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login do usuário |
| GET | `/api/auth/validate` | Validar token JWT |

### Funcionários (Requer autenticação)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/funcionarios` | Listar todos os funcionários |
| GET | `/api/funcionarios/{id}` | Buscar funcionário por ID |
| POST | `/api/funcionarios` | Criar novo funcionário |
| PUT | `/api/funcionarios/{id}` | Atualizar funcionário |
| DELETE | `/api/funcionarios/{id}` | Excluir funcionário |
| PATCH | `/api/funcionarios/{id}/status` | Alternar status (Ativo/Inativo) |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Verificar status da API |

## Funcionalidades

### Tela de Login
- Autenticação com email e senha
- Validação de campos
- Feedback visual de erros
- Credenciais de teste exibidas na tela

### Dashboard de Funcionários
- Listagem em tabela de todos os funcionários
- Visualização de: Nome, Data de Admissão, Salário, Status
- Badge visual para status (Ativo/Inativo)
- Contador de funcionários cadastrados

### CRUD de Funcionários
- **Criar**: Formulário modal para cadastro
- **Editar**: Edição de dados existentes
- **Excluir**: Remoção com confirmação
- **Alternar Status**: Toggle rápido entre Ativo/Inativo

## Migrations FlywayDB

O sistema utiliza duas migrations:

1. **V1__criar_tabelas.sql**: Cria as tabelas `usuario` e `funcionario`
2. **V2__seed_dados.sql**: Insere dados iniciais:
   - 1 usuário administrador (para login)
   - 1 funcionário de exemplo

## Portas Utilizadas

| Serviço | Porta |
|---------|-------|
| PostgreSQL | 5432 |
| Backend (Spring Boot) | 8080 |
| Frontend (React/Nginx) | 3000 |

## Parar a Aplicação

Para parar todos os containers:

```bash
docker-compose down
```

Para parar e remover volumes (limpar banco de dados):

```bash
docker-compose down -v
```

## Arquitetura

O projeto segue uma arquitetura em camadas no backend:

- **Controller**: Recebe requisições HTTP e retorna respostas
- **Service**: Contém a lógica de negócio
- **Repository**: Acesso ao banco de dados via Spring Data JPA
- **Entity**: Modelos de dados mapeados para tabelas

A segurança é implementada com:
- JWT para autenticação stateless
- BCrypt para hash de senhas
- CORS configurado para aceitar requisições do frontend

## Autor

Desenvolvido como teste prático para vaga de Programador Java Web Full Stack.