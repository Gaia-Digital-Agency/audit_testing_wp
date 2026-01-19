# Claude Code Project Instructions

## Project Overview

This is a **WordPress Quality Assurance Automation** project that implements a 3-pillar testing strategy:

1. **Pillar 1**: Local pre-commit hooks (Husky, lint-staged)
2. **Pillar 2**: CI/CD code validation (GitHub Actions)
3. **Pillar 3**: Live site auditing (Lighthouse CI, WPScan)

## Key Files

### Main Workflow

- `testing_audit_package/code_files/frontend-ci-wp.yml` - The primary GitHub Actions workflow
  - **Configuration**: `YOUR_SITE_URL` environment variable at the top (currently: `http://72.62.125.163:8002/`)
  - **Jobs**: php-lint, frontend-lint-and-audit, live-audit, generate-report
  - **Outputs**: PDF report artifact (`lighthouse-scan-report-pdf`)

### Documentation

- `testing_audit_package/README.md` - Main documentation
- `testing_audit_package/audit_plans/` - Strategy documents
- `testing_audit_package/code_files/use_guide.md` - Implementation guide

## Workflow Structure

```
WordPress Quality Checks
├── php-lint                    # PHP coding standards (runs on PR)
├── frontend-lint-and-audit     # ESLint, Prettier, npm audit (runs on PR)
├── live-audit                  # Lighthouse + WPScan (runs on push to main)
│   └── Uploads lhci-report artifact
└── generate-report             # Converts Lighthouse HTML to PDF
    └── Uploads lighthouse-scan-report-pdf artifact
```

## Required Secrets

- `WPSCAN_API_TOKEN` - API token for WordPress security scanning

## Common Tasks

### Change the target URL

Edit `testing_audit_package/code_files/frontend-ci-wp.yml`:

```yaml
env:
  YOUR_SITE_URL: "http://your-new-url.com/"
```

### Trigger live audit

Push or merge to the `main` branch - live audits only run on main.

### Find PDF reports

GitHub Actions > Workflow run > Artifacts > `lighthouse-scan-report-pdf`

## Development Notes

- The workflow uses `puppeteer` to convert Lighthouse HTML reports to PDF
- Lighthouse outputs files with timestamps (e.g., `lhr-1234567890.html`)
- WPScan runs with `continue-on-error: true` to not fail the build
