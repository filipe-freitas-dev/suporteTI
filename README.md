
# 📞 suporteTI

Sistema de abertura e gerenciamento de chamados de suporte técnico em TI, com frontend desenvolvido em React puro e backend em Go.

## 🚀 Funcionalidades

- Abertura de chamados com informações detalhadas
- Listagem e filtragem de chamados
- Atualização de status dos chamados
- Autenticação de usuários
- Dashboard com visualização geral dos chamados

## 🛠️ Tecnologias Utilizadas

### Frontend

- React (JavaScript)
- HTML5 e CSS3
- React Router (para navegação entre páginas)
- Axios (para requisições HTTP)

### Backend

- Go (Golang)
- Biblioteca padrão de `net/http`
- Banco de dados relacional (ex: MySQL)

## 📦 Estrutura do Projeto

```
├── LICENSE
├── suporte                #Frontend React.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── src
│   │   ├── App.tsx
│   │   ├── axiosConfig.tsx
│   │   ├── components
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── pages
│   │   ├── routes
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── suporteApi              #Backend Go
    ├── go.mod
    ├── go.sum
    ├── main.go
    ├── sql
    │   └── sql.sql
    ├── src
    │   ├── authentication
    │   ├── config
    │   ├── controllers
    │   ├── database
    │   ├── middlewares
    │   ├── models
    │   ├── repos
    │   ├── responses
    │   ├── router
    │   └── security
    └── suporteApi

```

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Go (versão 1.22 ou superior)
- Banco de dados MySQL

### Backend (Go)

1. Navegue até o diretório `suporteApi`:
   ```bash
   cd suporteApi
   ```

2. Instale as dependências:
   ```bash
   go mod tidy
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=suporte_ti
   ```

4. Execute a aplicação:
   ```bash
   go run main.go
   ```
   
   ou
   
   ```bash
   go build
   ./suporteApi
   ```

### Frontend (React)

1. Navegue até o diretório `suporte`:
   ```bash
   cd suporte
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie a aplicação:
   ```bash
   npm start
   ```

## 🧪 Testes

*Incluir instruções sobre como executar os testes automatizados, caso existam.*

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

