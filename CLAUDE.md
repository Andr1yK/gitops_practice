# CLAUDE.md - GitOps Practice Project

## Commands
- Backend dev: `cd backend && npm run dev` or `make dev`
- Docker dev: `make docker-dev` or `cd backend && docker-compose up`
- Build: `make build` or `cd backend && npm run build`
- Lint: `cd backend && npm run lint`
- Format: `cd backend && npm run format`
- Test: `make test` or `cd backend && npm test`
- Single test: `cd backend && npx jest path/to/test.ts`
- Database: `make db-setup` (migrate) or `cd backend && npm run prisma:studio` (UI)
- Local DB only: `make db-local` or `cd backend && docker-compose up postgres -d`

## Code Style
- **Imports**: Group imports: external libs first, then internal modules
- **Formatting**: Use Prettier with 2-space indentation
- **Types**: Strong typing with TypeScript; avoid `any`
- **Naming**: camelCase for variables/functions; PascalCase for classes/interfaces
- **Error Handling**: Use AppError class for custom errors
- **Architecture**: Follow MVC pattern with controllers/routes/middlewares
- **Async**: Always use try/catch with async/await
- **API Design**: RESTful endpoints with proper HTTP methods and status codes
- **Branching**: Use trunk-based development with short-lived feature branches
