# TV Schedule API

A modern and scalable TV program scheduling API built with NestJS, Prisma, and MySQL. This application provides a robust backend for managing TV programs, their schedules, and related media content.

## 🚀 Features

- TV Program Management
- Program Banner Management
- RESTful API with Swagger Documentation
- Clean Architecture Implementation
- Comprehensive Test Coverage
- Docker Support
- Database Migrations
- Basic Authentication

## 🛠 Tech Stack

- **Framework**: NestJS 11
- **Database**: MySQL 8.4
- **ORM**: Prisma 6.5
- **Testing**: Vitest
- **Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm
- **Code Quality**: Biome
- **Container**: Docker & Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version)
- pnpm (`npm install -g pnpm`)
- Docker and Docker Compose
- MySQL (if running locally without Docker)

## 🔧 Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/damattag/tv-schedule
   cd tv-schedule
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```env
   # Application
   NODE_ENV=local # Options: local, development, production, test
   API_PORT=3001

   # Database
   DATABASE_URL="mysql://root:root@db:3306/tv_schedule"

   # Frontend
   FRONT_DEPLOY_URL=""

   # Authentication
   BASIC_USER=admin
   BASIC_PASS=VerySt0ngP4ss
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

## 🚀 Running the Application

### Using Docker (Recommended)

1. Start the database and application:
   ```bash
   docker-compose --profile development up -d
   ```

### Local Development

1. Start only the database:
   ```bash
   docker-compose --profile local up db -d
   ```

2. Run database migrations:
   ```bash
   pnpm prisma:migration:run
   ```

3. Start the application:
   ```bash
   pnpm start:dev
   ```

The API will be available at `http://localhost:3001`

## 🧪 Testing

The project includes both unit and e2e tests:

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Run test coverage
pnpm test:cov
```

## 🛠 Development Tools

- **Prisma Studio**: View and edit database records
  ```bash
  pnpm prisma:studio
  ```

- **Linting**: Check and fix code style
  ```bash
  pnpm lint
  ```

- **Type Checking**: Verify TypeScript types
  ```bash
  pnpm types:check
  ```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:3001/docs`

## 📁 Project Structure

```
src/
├── core/           # Core domain entities and exceptions
├── domain/         # Business logic and use cases
│   └── programs/   # TV Program domain
├── infra/          # Infrastructure layer
│   ├── auth/       # Authentication
│   ├── database/   # Database configuration and repositories
│   └── http/       # HTTP controllers and DTOs
└── main.ts         # Application entry point
```

