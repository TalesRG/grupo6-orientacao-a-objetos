# 🏁 Projeto TPPE - Backend (NestJS + PostgreSQL)

Este é o backend do projeto TPPE, desenvolvido em [NestJS](https://nestjs.com/) com banco de dados PostgreSQL, utilizando Docker para facilitar o ambiente de desenvolvimento.

---

## 📦 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Yarn](https://yarnpkg.com/) se quiser rodar localmente sem Docker

---

## 🚀 Como rodar o projeto com Docker

### 🔧 1. Suba os containers

```bash
docker-compose up --build
```

Isso irá:

- Construir a imagem do backend NestJS
- Subir o PostgreSQL com as credenciais definidas
- Rodar a aplicação na porta `3000`

### 🌐 Acesse a API

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## 🛠 Variáveis de ambiente

As variáveis estão configuradas diretamente no `docker-compose.yml`, mas se quiser usar um `.env`, adicione na raiz:

```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tppe_db
```

---

## 🧪 Rodando testes (dentro do container)

```bash
docker-compose exec app yarn test
```

---

## 🧰 Comandos úteis

| Comando                            | Descrição                             |
|-----------------------------------|---------------------------------------|
| `yarn install`                    | Instala as dependências               |
| `yarn start:dev`                  | Inicia o NestJS em modo desenvolvimento |
| `yarn build`                      | Compila o projeto para produção       |
| `yarn test`                       | Executa os testes                     |

---

## 🐘 Conexão com PostgreSQL

Você pode acessar o banco com:

- **Host**: `localhost`
- **Porta**: `5432`
- **Usuário**: `postgres`
- **Senha**: `postgres`
- **Banco**: `tppe_db`

---

## 🧼 Limpando containers e volumes (caso necessário)

```bash
docker-compose down -v --remove-orphans
```

---
