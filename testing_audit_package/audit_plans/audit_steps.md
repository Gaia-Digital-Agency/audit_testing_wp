# 3-Pillar Frontend Automation Strategy

This guide provides a step-by-step process for setting up a comprehensive, automated quality assurance workflow for your frontend project. It combines local checks for instant feedback with a powerful CI/CD pipeline that validates both the source code and the live, deployed application.

## Prerequisites

Before you begin, ensure you have the following set up in your project:
-   Node.js and npm (or yarn) installed.
-   A Git repository for your project, hosted on a platform like GitHub.
-   Basic configuration for ESLint (`.eslintrc.js`) and Prettier (`.prettierrc`).
-   Scripts in your `package.json` for linting, formatting, testing, and building (e.g., `lint`, `format:check`, `test`, `build`).

## Pillar 1: Local Environment (Pre-Commit Hooks)

This pillar provides the fastest feedback loop by running checks on the developer's machine *before* code is committed. This ensures that all code entering the repository adheres to basic quality and style standards.

### Step 1: Install Dependencies

Install `husky` (a tool for running Git hooks) and `lint-staged` (a tool for running scripts against staged files).

```bash
npm install --save-dev husky lint-staged
```

### Step 2: Initialize Husky

Run the `husky install` command to create the `.husky/` directory in your project root. This directory will hold your Git hook scripts.

```bash
npx husky install
```

### Step 3: Create the Pre-Commit Hook

Use the `husky add` command to create a `pre-commit` script. This command tells Git to run `lint-staged` every time you attempt to make a commit.

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### Step 4: Configure Lint-Staged

Open your `package.json` file and add a `lint-staged` configuration. This configuration specifies which commands to run on which files. The example below will automatically format and lint all relevant files that are part of the commit.

```json
// In your package.json
"lint-staged": {
  "*.{js,jsx,ts,tsx,css,md,html,json}": "prettier --write",
  "*.{js,jsx,ts,tsx}": "eslint --fix"
}
```

**Result:** Now, whenever a developer runs `git commit`, any staged files will be automatically formatted and linted. If the linter finds errors that it can't fix, the commit will be aborted, preventing broken code from entering the repository.

## Pillar 2: CI Pipeline for Code Validation

This pillar acts as the main quality gate for your codebase. It runs a comprehensive suite of checks on a remote server whenever a pull request is opened or updated.

### Step 1: Create the GitHub Actions Workflow File

In your project's root, create a directory path `.github/workflows/`. Inside this directory, create a new file named `frontend-ci.yml`.

### Step 2: Define the Workflow

Copy the YAML configuration below into your `frontend-ci.yml` file. This workflow defines two parallel jobs:
1.  `lint-and-format`: Ensures the code adheres to style guides.
2.  `test-and-audit`: Runs your test suite, checks for security vulnerabilities, and verifies that the project can be built successfully.

```yaml
# .github/workflows/frontend-ci.yml

name: Frontend Quality Checks

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-format:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint
      - name: Check formatting with Prettier
        run: npm run format:check

  test-and-audit:
    name: Test & Audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run unit and integration tests
        run: npm test -- --coverage
      - name: Audit for security vulnerabilities
        run: npm audit --audit-level=high
      - name: Build project
        run: npm run build
```

### Step 3: Commit and Push the Workflow

Commit the `.github/workflows/frontend-ci.yml` file to your repository.

**Result:** Now, every pull request will automatically trigger these checks. You can configure your repository settings to block merging until all checks pass, ensuring that no unverified code reaches your main branch.


## Pillar 3: Live URL Audit on Deployment

This final pillar validates the end-user experience by running audits against a live, deployed URL. This is the most effective way to catch performance, accessibility, and SEO issues that only appear in a real browser environment.

### Step 1: Update the GitHub Actions Workflow

Modify your `frontend-ci.yml` file to add a third job, `live-audit`. This job will run after the others and will be triggered only on pushes to the `main` branch (i.e., after a PR is merged).

You will need to **replace `YOUR_SITE_URL`** with the actual URL of your staging or production environment.

*(This step is demonstrated in the diff for `.github/workflows/frontend-ci.yml` below).*

### Step 2: Set Up E2E and Accessibility Tests

The `live-audit` job assumes you have an E2E testing framework like Playwright or Cypress set up. Within these tests, you can:
-   **Check for broken links:** Write a test that crawls your site and checks the status code of every link.
-   **Verify 404 pages:** Intentionally navigate to a non-existent page and assert that your custom 404 page is rendered.
-   **Run accessibility checks:** Use a library like `axe-core` (e.g., `@axe-core/playwright`) to scan each page for accessibility violations during your E2E tests.

**Result:** After every successful deployment to your main environment, this workflow will automatically run Lighthouse to catch performance regressions and execute E2E tests to validate critical user flows and accessibility on the live site.