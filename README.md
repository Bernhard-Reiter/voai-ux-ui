# voai Monorepo

Enterprise-grade CRM & Frontend monorepo built with Next.js, TypeScript, and Turborepo.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development
pnpm dev

# Create a conventional commit
pnpm commit
```

## 📁 Project Structure

```
voai-monorepo/
├── apps/
│   ├── frontend/    # Customer-facing Next.js app
│   ├── crm/         # Internal CRM Next.js app
│   └── docs/        # Documentation (Storybook + Astro)
├── packages/
│   ├── ui/          # Shared React components & Tailwind
│   ├── eslint-config/
│   └── tsconfig/
└── turbo.json       # Turborepo configuration
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20 LTS
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)
- Git

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Bernhard-Reiter/voai-ux-ui.git
   cd voai-ux-ui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up Git hooks:
   ```bash
   pnpm prepare
   ```

## 🌿 Git Workflow

### Branch Strategy

- `main` - Production branch (protected)
- `develop` - Integration branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches
- `chore/*` - Maintenance tasks

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

```bash
# Interactive commit helper
pnpm commit

# Manual format
git commit -m "type: description"
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

### Creating Pull Requests

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and commit:
   ```bash
   pnpm commit
   ```

3. Push to GitHub:
   ```bash
   git push -u origin feature/your-feature
   ```

4. Create PR via GitHub CLI:
   ```bash
   gh pr create --base develop
   ```

## 🔒 Branch Protection

The `main` branch is protected with:
- ✅ Pull request reviews required
- ✅ Status checks must pass (commitlint)
- ✅ Branches must be up to date
- ✅ Administrators included
- ❌ Force pushes disabled
- ❌ Deletions disabled

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# E2E tests
pnpm e2e

# Storybook
pnpm storybook
```

## 📦 CI/CD

GitHub Actions run on every PR:
- 🔍 Linting (ESLint + Prettier)
- ✅ Type checking (TypeScript)
- 🧪 Unit tests (Vitest)
- 📝 Commit message validation
- 🚀 Build verification

## 🎨 Design System

We follow a Superhuman-inspired design with:
- Tailwind CSS for styling
- Shared component library in `packages/ui`
- Design tokens for consistency
- Storybook for component documentation

## 📚 Documentation

- Development docs: `/docs`
- Component docs: Run `pnpm storybook`
- Architecture decisions: `/docs/adrs`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit using conventional commits
4. Push to your fork
5. Create a Pull Request

## 📄 License

MIT © voai Team