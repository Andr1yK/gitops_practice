# Task Management API

A RESTful API for task management built with TypeScript, Express, Prisma, and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Task categorization and status tracking
- Data validation
- Error handling

## Tech Stack

- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker and Docker Compose (for local development)
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Copy the `.env.example` to `.env` and adjust the values as needed:

```bash
cp .env.example .env
```

### Development

#### Using Docker

Start the development environment using Docker Compose:

```bash
docker-compose up
```

This will start:
- PostgreSQL database
- API server with hot reloading

#### Without Docker

1. Make sure PostgreSQL is running and accessible with the credentials in your `.env` file
2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run database migrations:

```bash
npm run prisma:migrate
```

4. Start the development server:

```bash
npm run dev
```

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (authenticated)

#### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing

Run tests with:

```bash
npm test
```

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Docker Build

Build the Docker image:

```bash
docker build -t task-management-api .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env task-management-api
```