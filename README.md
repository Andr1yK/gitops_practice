# GitOps Infrastructure Project

This repository implements a GitOps approach to infrastructure management using GitHub Actions and Terraform, with a Task Management application.

## Project Overview

This project demonstrates:
- Infrastructure as code (IaC) management following GitOps principles
- A full-stack Task Management application with TypeScript, Express, Prisma, PostgreSQL and React
- CI/CD pipelines using GitHub Actions
- Multiple environment support (dev, prod)
- Automated security scanning and drift detection

## Repository Structure

```
├── .github/workflows/    # GitHub Actions workflow definitions
├── backend/              # Task Management API (Express + Prisma)
├── frontend/             # Web interface (React)
├── docs/                 # Project documentation
├── scripts/              # Utility scripts
├── terraform/            # Terraform configuration
│   ├── environments/     # Environment-specific configurations
│   ├── global/           # Global/shared resources
│   └── modules/          # Reusable Terraform modules
```

## Quick Start

The project uses a Makefile to simplify common operations:

```bash
# Install dependencies
make install

# Run the backend in development mode
make dev

# Run the frontend in development mode
make dev-frontend

# Start with Docker
make docker-dev

# Run tests
make test
```

For a full list of available commands:

```bash
make help
```

## Detailed Documentation

See the detailed setup instructions in [docs/setup.md](docs/setup.md).
