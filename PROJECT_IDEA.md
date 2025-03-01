# GitOps-Based Infrastructure Project Requirements

Here's a comprehensive set of requirements for building a GitOps-based infrastructure project using GitHub Actions and Terraform:

## Core Requirements

### Repository Structure
- Create a well-organized monorepo with clear separation of concerns
- Implement branch protection for main/master and environment branches
- Structure Terraform code using modules for reusability
- Include README with project overview, architecture diagram, and setup instructions

### Infrastructure Components
- Define a simple but realistic application stack (e.g., web app + database)
- Create networking components (VPC, subnets, security groups)
- Set up at least two environments (dev and prod)
- Implement state management using remote backend (e.g., S3 + DynamoDB)

### GitHub Actions Workflows
- Implement separate workflows for:
    - PR validation and planning
    - Infrastructure deployment
    - Security scanning
    - Drift detection
- Use GitHub environments for environment-specific deployments

## Implementation Guidelines

### Workflow Requirements
1. **PR Validation Workflow**
    - Trigger on pull requests to protected branches
    - Run `terraform fmt -check` to verify formatting
    - Execute `terraform validate` to check syntax
    - Generate and post `terraform plan` output as PR comment
    - Run infrastructure tests if applicable

2. **Deployment Workflow**
    - Trigger on merges to environment branches
    - Include approval gates for production deployments
    - Execute `terraform apply` with appropriate variables
    - Post deployment summary as PR comment or issue
    - Implement rollback mechanism for failed deployments

3. **Security & Compliance Workflow**
    - Schedule regular security scans (e.g., weekly)
    - Use tools like tfsec, checkov, or terrascan
    - Report findings as GitHub issues
    - Block deployments for critical security issues

4. **Drift Detection Workflow**
    - Schedule regular runs (e.g., daily)
    - Compare actual infrastructure with Terraform state
    - Alert on detected drift (GitHub issue or notification)

### Best Practices
- Use Terraform workspaces or separate state files for environments
- Implement secure secret management (GitHub Secrets or AWS Secrets Manager)
- Apply infrastructure tagging strategy for resources
- Set up cost estimation as part of planning phase
- Version your Terraform modules

### Documentation Requirements
- Architecture diagrams (draw.io or similar)
- Runbook for common operations
- Contributing guidelines
- Deployment workflow documentation
- Explanation of security measures

## Project Extensions (Optional)
- Add infrastructure testing with Terratest
- Implement custom GitHub Action for infrastructure cost estimation
- Create ChatOps integration for Slack/Discord notifications
- Add feature flagging for infrastructure changes
- Implement canary deployments for critical infrastructure changes

## Evaluation Criteria
- Code quality and organization
- Security best practices
- Documentation quality
- Automation completeness
- Error handling and resilience
- Cost optimization considerations

This framework gives you enough structure to build a compelling project while leaving room for your creativity and implementation choices. The project will demonstrate your ability to apply GitOps principles to infrastructure management, which is a highly valuable skill for DevOps engineers.
