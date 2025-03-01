## Application: Task Management API

**Tech Stack:**
- Backend: TypeScript + Express + Prisma + PostgreSQL + GraphQL (Apollo Server)
- Frontend: NextJS v15 (App router) + React v19 + Apollo Client (minimal UI)

**Application Features:**
- Simple task management system with CRUD operations
- User authentication (basic JWT)
- Task categorization 

This application is perfect because:

1. **Familiar Technologies**: Leverages your TypeScript, React, and NextJS experience
2. **New Learning**: Introduces Prisma as you wanted to try it
3. **Minimal Development**: Simple enough to build quickly but realistic enough to be portfolio-worthy
4. **Infrastructure Complexity**: Requires multiple components (database, API, frontend) that benefit from proper IaC
5. **Stateful + Stateless**: Includes both stateful (database) and stateless (API, frontend) components to manage

## Infrastructure Components to Manage:

- Database: RDS PostgreSQL instance with proper backup configuration
- API Service: Containerized Express application running on ECS or a simple EC2 instance
- Frontend: Static assets hosted on S3 with CloudFront distribution
- Networking: VPC, subnets, security groups, load balancers
- Monitoring: CloudWatch dashboards and alarms
- CI/CD: GitHub Actions for both application and infrastructure code
