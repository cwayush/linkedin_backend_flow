# LinkedIn Clone - Microservices Node.js Backend

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="ExpressJS" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/NeonDB-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="NeonDB" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br/>

A robust, highly scalable, and fully distributed **Microservices Backend** modeling the core functionalities of LinkedIn. This repository represents the architectural migration from a legacy Java Spring Boot system into a modern, high-performance **Node.js, TypeScript, and Prisma ORM** ecosystem leveraging strict **Domain-Driven Design (DDD)**.

<img width="1431" height="821" alt="image" src="https://github.com/user-attachments/assets/15f98c61-615a-4990-939a-83c6fcede6aa" />

---

## 🏗 System Architecture

The ecosystem relies on an **API Gateway** routing traffic to **6 independent microservices** running concurrently within an NPM workspace monorepo.

- 🔐 **Auth Service (`/api/auth`)**: JWT Authentication & Registration
- 👤 **User Service (`/api/users`)**: Profiles, Experiences & Connections
- 📝 **Post Service (`/api/posts`)**: Feeds, Comments, & Likes
- 💬 **Chat Service (`/api/chats`)**: Real-time Messaging & Conversations
- 🏢 **Company & Job Service (`/api/company` / `/api/jobs`)**: Employers, Listings & Job Applications
- 📁 **File Service (`/api/files`)**: Centralized Media Storage & Uploads

### Domain-Driven Design (DDD)

Each microservice is entirely self-contained, isolating logic into functional layers:

1.  **Controllers** (`*.controller.ts`): Request parameter extraction and HTTP Response mappings.
2.  **Validators** (`*.validator.ts`): Strict request payload runtime validation using `Zod`.
3.  **Services** (`*.service.ts`): Pure uncoupled business logic and domain processing.
4.  **Repositories** (`*.repository.ts`): Abstracted database connectivity powered by Prisma.

---

## ⚡ Tech Stack

- **Runtime:** Node.js v22
- **Language:** TypeScript
- **Framework:** Express.js 5
- **Database:** PostgreSQL (Neon Serverless DB)
- **ORM:** Prisma Client v6
- **Validation:** Zod
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Logging:** Winston (Centralized JSON Formatting)
- **Workspace Management:** NPM Workspaces
- **Process Manager:** Concurrently
- **Testing Setup:** Jest & Supertest

---

## 🚀 Getting Started

To launch the entire distributed backend cluster locally on your machine, follow these steps:

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [NPM](https://www.npmjs.com/) (v8 or higher)
- A running PostgreSQL database instance (or a [Neon DB](https://neon.tech/) connection string)

### 2. Environment Configuration

Create a `.env` file in the root directory. You can use `.env.example` as a template:

```env
# Root /.env
DATABASE_URL="postgresql://user:password@host/database_name?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
LOG_LEVEL="info"
```

### 3. Installation & Bootstrapping

Install all workspace dependencies and compile the shared Prisma types across the monorepo:

```bash
# 1. Install dependencies for all microservices natively linking local workspaces
npm install

# 2. Push the Prisma Schema to your Postgres Database
npx prisma db push --schema=shared/prisma/schema.prisma

# 3. Generate the shared Prisma Client library
npx prisma generate --schema=shared/prisma/schema.prisma
```

### 4. Running the Cluster

Use the built-in workspace compilation scripts to spin up the API gateway and all 6 backend services concurrently!

```bash
# Compile TypeScript to /dist bundles for all services
npm run build:all

# Launch the PM2 cluster locally (boots 7 node processes seamlessly)
npm run dev:all
```

The gateway should now be routing traffic on `http://localhost:8080/`!

---

## 📖 Comprehensive API Documentation

The backend supports extensive RESTful interactions across its domains.

### 🔐 Auth Service

| Method | Endpoint             | Description                             |
| :----- | :------------------- | :-------------------------------------- |
| `POST` | `/api/auth/register` | Register a new user                     |
| `POST` | `/api/auth/login`    | Authenticate a user and receive a token |

### 👤 User Service

| Method | Endpoint                 | Description                                            |
| :----- | :----------------------- | :----------------------------------------------------- |
| `GET`  | `/api/users/profile`     | Get the profile of the current authenticated user      |
| `GET`  | `/api/users/friends`     | Get a list of friends/connections for the current user |
| `POST` | `/api/users/experiences` | Create a new experience for the current user           |
| `GET`  | `/api/users/experiences` | Get all experiences for the current user               |

### 📝 Post Service

| Method | Endpoint              | Description             |
| :----- | :-------------------- | :---------------------- |
| `POST` | `/api/posts`          | Create a new post       |
| `GET`  | `/api/posts`          | Get all posts (feed)    |
| `POST` | `/api/posts/comments` | Add a comment to a post |
| `POST` | `/api/posts/likes`    | Like or unlike a post   |

### 🏢 Company & Job Service

| Method | Endpoint            | Description               |
| :----- | :------------------ | :------------------------ |
| `POST` | `/api/company`      | Create a new company page |
| `POST` | `/api/jobs`         | Create a new job posting  |
| `GET`  | `/api/jobs`         | Get all job postings      |
| `POST` | `/api/jobs/applied` | Apply for a job           |

### 💬 Chat Service

| Method   | Endpoint          | Description                        |
| :------- | :---------------- | :--------------------------------- |
| `POST`   | `/api/chats`      | Create a new chat session          |
| `GET`    | `/api/chats`      | Get all chats for the current user |
| `DELETE` | `/api/chats/{id}` | Delete a specific chat             |

### 📁 File Service

| Method | Endpoint                  | Description                               |
| :----- | :------------------------ | :---------------------------------------- |
| `POST` | `/api/files/upload`       | Upload a file directly and return its URL |
| `POST` | `/api/files/batch-delete` | Batch delete multiple files               |

---

_Architected and engineered for high scalability._
