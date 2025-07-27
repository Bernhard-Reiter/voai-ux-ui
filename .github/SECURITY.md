# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

## Reporting a Vulnerability

We take the security of our software seriously, which includes all source code repositories managed through our GitHub organization.

If you believe you have found a security vulnerability in any of our repositories, please report it to us as described below.

### Please do not report security vulnerabilities through public GitHub issues.

Instead, please report them via email to security@voai.com.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English or German.

## Policy

We follow the principle of [Coordinated Vulnerability Disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure).

## Security Measures

This project implements several security measures:

### Authentication & Authorization
- Supabase Auth with JWT tokens (1-hour expiry)
- Row Level Security (RLS) on all database tables
- Secure session management

### Data Protection
- GDPR compliance with right to erasure
- Data retention policies
- Encrypted sensitive data storage
- Input sanitization and validation

### Infrastructure Security
- No hardcoded secrets (all in environment variables)
- Security headers implemented
- CORS properly configured
- Rate limiting on APIs

### Continuous Security
- Automated security scanning in CI/CD
- Dependency vulnerability scanning with Dependabot
- SAST with CodeQL and Semgrep
- Secret detection with TruffleHog and Gitleaks

### Compliance
- GDPR compliant
- OWASP Top 10 addressed
- SOC 2 mapping in progress