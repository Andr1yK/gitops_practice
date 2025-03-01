# Setup Instructions

This document provides instructions for setting up and using this GitOps infrastructure project.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (v1.0.0+)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [GitHub CLI](https://cli.github.com/) (optional)

## Initial Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/andr1yk/gitops_practice.git
   cd gitops_practice
   ```

2. Configure AWS credentials:
   ```bash
   aws configure
   ```

3. Set up required GitHub repository secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

## Running Terraform Locally

1. Navigate to the desired environment directory:
   ```bash
   cd terraform/environments/dev
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Plan your changes:
   ```bash
   terraform plan -out=tfplan
   ```

4. Apply the changes:
   ```bash
   terraform apply tfplan
   ```

## Working with GitHub Actions

The repository includes several GitHub Actions workflows:

- **PR Validation**: Automatically runs when creating a pull request to protected branches
- **Deployment**: Runs when merging to environment branches (e.g., `main`, `dev`, `prod`)
- **Security Scanning**: Scheduled weekly or can be manually triggered
- **Drift Detection**: Runs daily to detect infrastructure drift

## Troubleshooting

For common issues and their solutions, refer to the runbooks in the `docs/runbooks/` directory.
