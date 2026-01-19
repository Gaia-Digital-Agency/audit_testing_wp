# Testing Audit Package

A comprehensive documentation and configuration package for implementing a **3-Pillar Quality Assurance (QA) Automation Strategy** for WordPress projects.

## Purpose

This package provides everything needed to set up and maintain a robust, automated quality assurance workflow that combines:

1. **Local developer checks** for instant feedback
2. **CI/CD pipeline validation** for code quality gates
3. **Live site auditing** for production monitoring

The goal is to catch issues at every stage of development—from the moment code is written to after it's deployed—ensuring WordPress projects maintain high standards for code quality, performance, accessibility, and security.

## Folder Structure

```
testing_audit_package/
├── audit_plans/              # Strategy documents and setup guides
│   ├── audit_steps.md        # Generic frontend setup guide
│   ├── audit_steps_wp.md     # WordPress-specific setup guide
│   ├── automation_plan.md    # Complete 3-pillar automation strategy
│   ├── manual.md             # Manual testing guidelines
│   ├── autimation.md         # Additional automation notes
│   └── frontend_checklistt.pdf  # PDF checklist for frontend quality
│
├── code_files/               # Configuration templates and guides
│   ├── frontend-ci.yml       # GitHub Actions workflow (generic)
│   ├── frontend-ci-wp.yml    # GitHub Actions workflow (WordPress) - MAIN WORKFLOW
│   ├── use_guide.md          # Implementation and testing guide
│   └── manual_check_template.md  # Manual QA review checklist
│
└── README.md                 # This file
```

## The 3-Pillar Strategy

### Pillar 1: Local Pre-Commit Hooks

Provides instant feedback on the developer's machine before code is committed.

- **Tools**: Husky, lint-staged, PHP CodeSniffer (WPCS)
- **Checks**: WordPress coding standards, ESLint, Prettier
- **Benefit**: Prevents poorly formatted or non-compliant code from entering the repository

### Pillar 2: CI/CD Code Validation

Acts as a quality gate on pull requests before code is merged.

- **Tools**: GitHub Actions, PHP CodeSniffer, ESLint, Prettier, npm audit
- **Checks**: PHP linting, frontend linting, security vulnerability scanning
- **Benefit**: Ensures all code meets standards before reaching the main branch

### Pillar 3: Live Site Auditing

Validates the deployed application's performance and security.

- **Tools**: Lighthouse CI, WPScan
- **Checks**: Core Web Vitals, accessibility, SEO, WordPress vulnerabilities
- **Benefit**: Monitors production quality and catches regressions after deployment

## Key Documents

| File                                                            | Description                                |
| --------------------------------------------------------------- | ------------------------------------------ |
| [audit_steps_wp.md](audit_plans/audit_steps_wp.md)              | Step-by-step WordPress setup guide         |
| [automation_plan.md](audit_plans/automation_plan.md)            | Complete automation strategy documentation |
| [use_guide.md](code_files/use_guide.md)                         | How to implement and test the workflow     |
| [manual_check_template.md](code_files/manual_check_template.md) | Checklist for manual QA reviews            |
| [frontend-ci-wp.yml](code_files/frontend-ci-wp.yml)             | GitHub Actions workflow template           |

## Getting Started

1. **Read the strategy**: Start with [automation_plan.md](audit_plans/automation_plan.md) to understand the full approach
2. **Follow the setup guide**: Use [audit_steps_wp.md](audit_plans/audit_steps_wp.md) for WordPress-specific implementation
3. **Copy the workflow**: Place [frontend-ci-wp.yml](code_files/frontend-ci-wp.yml) in your project's `.github/workflows/` directory
4. **Configure your site URL**: Edit `frontend-ci-wp.yml` and update the `YOUR_SITE_URL` at the top of the file
5. **Set up secrets**: Add `WPSCAN_API_TOKEN` to your GitHub repository secrets
6. **Test your setup**: Follow the testing steps in [use_guide.md](code_files/use_guide.md)
7. **Perform manual reviews**: Use [manual_check_template.md](code_files/manual_check_template.md) for items that require human judgment

## Quick Configuration

The `frontend-ci-wp.yml` workflow has a configurable URL at the top for easy setup:

```yaml
# ============================================
# CONFIGURATION - Update this URL before use:
# ============================================
# YOUR_SITE_URL: http://your-site-url.com/
# ============================================

env:
  YOUR_SITE_URL: "http://your-site-url.com/"
```

This URL is used for:

- **Lighthouse CI**: Performance, accessibility, SEO, and best practices audits
- **WPScan**: WordPress security vulnerability scanning

## What Gets Automated vs. Manual

### Automated Checks

- Code formatting and linting (PHP, JS, CSS)
- WordPress coding standards compliance
- Security vulnerability scanning
- Performance metrics (Lighthouse)
- Accessibility audits (basic)
- SEO technical checks

### Manual Reviews Required

- Visual design consistency
- Content quality and clarity
- Keyboard navigation testing
- Screen reader experience
- User experience flow
- Browser compatibility verification

## Reports and Output

- **Terminal**: Instant feedback during `git commit` (Pillar 1)
- **GitHub Actions**: Detailed logs and status checks (Pillar 2 & 3)
- **PDF Artifacts**: Downloadable Lighthouse reports from GitHub Actions
- **Interactive Reports**: Lighthouse CI temporary public storage links

### Accessing the PDF Report

After the workflow completes:

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Click on the completed workflow run
4. Scroll down to the **Artifacts** section
5. Download **lighthouse-scan-report-pdf**

The artifact contains `Lighthouse-Report.pdf` with your site's performance, accessibility, SEO, and best practices scores.

## Requirements

- Node.js and npm
- Composer (for PHP dependencies)
- Git repository hosted on GitHub
- WPScan API token (free tier available)

---

_This package is part of the audit_testing_wp framework by Gaia Digital Agency._
