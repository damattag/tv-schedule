# TV Schedule API

A modern and scalable TV program scheduling API built with NestJS, Prisma, and MySQL. This application provides a robust backend for managing TV programs, their schedules, and related media content. Built with clean architecture principles, it offers a reliable solution for TV networks and streaming platforms to manage their program schedules efficiently.

## 🚀 Features

- **TV Program Management**: Create, read, update, and delete TV programs
- **Program Banner Management**: Handle program images and media assets
- **RESTful API**: Well-documented endpoints with Swagger/OpenAPI
- **Clean Architecture**: Organized in layers for better maintainability and testing
- **Authentication**: Basic auth implementation for secure access
- **Comprehensive Testing**: Unit and E2E tests with high coverage
- **Docker Support**: Easy deployment with containerization
- **Database Migrations**: Version-controlled database schema
- **Input Validation**: Request validation using Zod
- **Error Handling**: Standardized error responses

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) 11
- **Database**: [MySQL](https://www.mysql.com/) 8.4
- **ORM**: [Prisma](https://www.prisma.io/) 6.5
- **Testing**: [Vitest](https://vitest.dev/)
- **Documentation**: [Swagger/OpenAPI](https://swagger.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Code Quality**: [Biome](https://biomejs.dev/)
- **Container**: [Docker](https://www.docker.com/) & Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Docker](https://www.docker.com/) and Docker Compose
- [MySQL](https://www.mysql.com/) (if running locally without Docker)

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
   ./init.sh
   ```

2. The API will be available at `http://localhost:3001`

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

## 📝 API Endpoints

The API provides the following main endpoints:

### Programs
- `GET /programs` - List all programs with pagination
- `GET /programs/:id` - Get program details by ID
- `POST /programs` - Create a new program
- `PUT /programs/:id` - Update an existing program
- `DELETE /programs/:id` - Delete a program

For detailed API documentation, visit the Swagger UI at `http://localhost:3001/docs` when the application is running.

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

