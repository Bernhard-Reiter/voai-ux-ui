# VOAI Design System

A modern, Superhuman-inspired UI component library built with React, TypeScript, and Tailwind CSS.

## 🎨 Overview

VOAI Design System provides a collection of beautiful, accessible, and performant UI components designed for building modern web applications. Inspired by Superhuman's minimalist aesthetic, our components emphasize speed, keyboard navigation, and a delightful user experience.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Bernhard-Reiter/voai-ux-ui.git
cd voai-ux-ui

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## 📦 Project Structure

```
voai-ux-ui/
├── apps/
│   ├── showcase/        # Live demo of components
│   └── storybook/       # Component documentation
├── packages/
│   └── ui/             # Core component library
│       ├── atoms/      # Basic building blocks
│       ├── molecules/  # Composite components
│       └── organisms/  # Complex components
└── docs/               # Additional documentation
```

## 🛠️ Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm storybook` - Launch Storybook documentation
- `pnpm showcase` - Run the showcase app
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier

## 🎯 Key Features

- **Superhuman-Inspired Design**: Clean, minimal interface with cyan accent colors
- **Command Palette**: ⌘K powered command interface for quick navigation
- **Atomic Design**: Organized components following atomic design principles
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full type safety and excellent developer experience
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Accessibility**: WCAG compliant components

## 🧩 Components

### Atoms
- Button
- Input
- Badge
- Spinner

### Molecules
- Card
- Form controls
- Notifications

### Organisms
- CommandPalette
- Navigation
- Modals

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

## 📚 Documentation

Visit our [Storybook](http://localhost:6006) for interactive component documentation and examples.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

MIT © VOAI Team