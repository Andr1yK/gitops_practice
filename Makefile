.PHONY: dev dev-backend dev-frontend install install-backend install-frontend build build-backend build-frontend test test-backend test-frontend clean

# Development environment
dev: dev-backend

dev-backend:
	@echo "Starting backend in development mode..."
	@cd backend && npm run dev

dev-frontend:
	@echo "Starting frontend in development mode..."
	@cd frontend && npm run dev

# Docker development environment
docker-dev:
	@echo "Starting backend with Docker in development mode..."
	@cd backend && docker-compose up

# Installation
install: install-backend

install-backend:
	@echo "Installing backend dependencies..."
	@cd backend && npm install && npm run prisma:generate

install-frontend:
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install

# Build
build: build-backend

build-backend:
	@echo "Building backend..."
	@cd backend && npm run build

build-frontend:
	@echo "Building frontend..."
	@cd frontend && npm run build

# Testing
test: test-backend

test-backend:
	@echo "Running backend tests..."
	@cd backend && npm test

test-frontend:
	@echo "Running frontend tests..."
	@cd frontend && npm test

# Database
db-setup:
	@echo "Setting up database..."
	@cd backend && npm run prisma:migrate

db-reset:
	@echo "Resetting database..."
	@cd backend && npx prisma migrate reset --force

# Clean
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf backend/dist frontend/build
	@echo "Cleaning node_modules..."
	@rm -rf backend/node_modules frontend/node_modules

# Help
help:
	@echo "Available commands:"
	@echo "  make dev              - Start backend in development mode"
	@echo "  make dev-frontend     - Start frontend in development mode"
	@echo "  make docker-dev       - Start backend with Docker in development mode"
	@echo "  make install          - Install backend dependencies"
	@echo "  make install-frontend - Install frontend dependencies"
	@echo "  make build            - Build backend for production"
	@echo "  make build-frontend   - Build frontend for production"
	@echo "  make test             - Run backend tests"
	@echo "  make test-frontend    - Run frontend tests"
	@echo "  make db-setup         - Set up the database with migrations"
	@echo "  make db-reset         - Reset the database (caution: deletes all data)"
	@echo "  make clean            - Remove build artifacts and node_modules"