# 3-Pillar Automation Strategy for WordPress

This guide provides a step-by-step process for setting up a comprehensive, automated quality assurance workflow for a WordPress project (theme or plugin). It combines local checks for instant feedback with a powerful CI/CD pipeline that validates the PHP/JS source code and audits the live, deployed application.

## Prerequisites

Before you begin, ensure you have the following set up:
-   A local WordPress development environment (e.g., Local, Docker, MAMP).
-   A Git repository for your project, hosted on GitHub.
-   **Composer** for managing PHP dependencies.
-   **Node.js and npm** (or yarn) for frontend build tools.
-   A `composer.json` file for your PHP dependencies.
-   A `package.json` file with scripts for your frontend assets (e.g., `lint`, `build`).

## Pillar 1: Local Environment (Pre-Commit Hooks)

This pillar provides the fastest feedback loop by running checks on your machine *before* code is committed. This ensures that all PHP and JavaScript code entering the repository adheres to WordPress coding standards and best practices.

### Step 1: Install PHP & Frontend Dependencies

First, install the necessary development tools using Composer for PHP and npm for the frontend.

**PHP (via Composer):**
```bash
# Install the WordPress Coding Standards for PHP_CodeSniffer
composer require --dev "wp-coding-standards/wpcs:^3.0"
```

**Frontend (via npm):**
```bash
# Install Husky for Git hooks and lint-staged to run scripts on staged files
npm install --save-dev husky lint-staged
```

### Step 2: Initialize Husky

Run the `husky install` command to create the `.husky/` directory.

```bash
npx husky install
```

### Step 3: Create the Pre-Commit Hook

Use `husky add` to create a `pre-commit` script that runs `lint-staged`.

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### Step 4: Configure Lint-Staged

Open your `package.json` file and add a `lint-staged` configuration. This configuration will run the appropriate linter for each file type: `phpcs` for PHP files and Prettier/ESLint for frontend files.

```json
// In your package.json
"lint-staged": {
  "*.php": [
    "vendor/bin/phpcs --standard=WordPress"
  ],
  "*.{js,jsx,ts,tsx}": "eslint --fix",
  "*.{css,md,html,json}": "prettier --write"
}
```

**Result:** Now, whenever a developer runs `git commit`, staged PHP files will be checked against WordPress standards, and frontend files will be linted and formatted. The commit will be aborted if any errors are found.


## Pillar 2: CI Pipeline for Code Validation (GitHub Actions)

This pillar acts as the main quality gate. It runs a comprehensive suite of checks on a remote server whenever a pull request is opened, ensuring code quality and security before merging.

### Step 1: Create the GitHub Actions Workflow File

In your project's root, create a directory path `.github/workflows/`. Inside, create a new file named `wordpress-ci.yml`.

### Step 2: Define the Workflow

Copy the YAML configuration below into your `wordpress-ci.yml` file. This workflow sets up both PHP and Node.js environments to run parallel jobs for linting and security auditing.

```yaml
# .github/workflows/wordpress-ci.yml

name: WordPress Quality Checks

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  php-lint:
    name: PHP Lint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
          extensions: mbstring, xml, ctype, iconv, intl, json
          coverage: none
      - name: Install Composer dependencies
        run: composer install --prefer-dist --no-progress
      - name: Run WordPress Coding Standards check
        run: vendor/bin/phpcs --standard=WordPress

  frontend-lint-and-audit:
    name: Frontend Lint & Audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install npm dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint
      - name: Check formatting with Prettier
        run: npm run format:check
      - name: Audit for npm security vulnerabilities
        run: npm audit --audit-level=high
```

### Step 3: Commit and Push the Workflow

Commit the `.github/workflows/wordpress-ci.yml` file to your repository.

**Result:** Every pull request will now trigger checks for both your PHP and frontend code. You can configure your repository to block merging until all checks pass.

---

## Pillar 3: Live URL Audit on Deployment

This final pillar validates the end-user experience and security posture by running audits against a live, deployed URL (ideally a staging site).

### Step 1: Update the GitHub Actions Workflow

Modify your `wordpress-ci.yml` file to add a third job, `live-audit`. This job will run after the others, triggered only on pushes to the `main` branch (i.e., after a PR is merged and deployed).

**Replace `YOUR_SITE_URL`** with the actual URL of your staging or production environment.

```yaml
# Add this job to the end of .github/workflows/wordpress-ci.yml

  live-audit:
    name: Live URL Audit
    needs: [php-lint, frontend-lint-and-audit]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install npm dependencies
        run: npm ci
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun --collect.url=YOUR_SITE_URL --upload.target=temporary-public-storage
      - name: Run WPScan for Vulnerabilities
        uses: wpscanteam/wpscan-action@v1.1.0
        with:
          # Replace YOUR_SITE_URL and add your WPScan API token as a secret
          url: YOUR_SITE_URL
          api-token: ${{ secrets.WPSCAN_API_TOKEN }}
          # Fails the build if any vulnerabilities are found
          fail-on-vulnerability: true
```

### Step 2: Add WPScan API Token

1.  Get a free API token from WPScan's website.
2.  In your GitHub repository, go to `Settings` > `Secrets and variables` > `Actions`.
3.  Click `New repository secret` and add your token with the name `WPSCAN_API_TOKEN`.

**Result:** After every deployment to your main environment, this workflow will automatically run Lighthouse to catch performance regressions and use WPScan to check your live site for known vulnerabilities in WordPress core, plugins, and themes.