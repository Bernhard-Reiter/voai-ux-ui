# Phase 1: Repo-Analyse & Architektur-Alignment - Implementierungsguide

## 🎯 Ziele
- Vollständige Code-Analyse und Dokumentation
- Monorepo-Struktur mit Turborepo
- Shared UI-Library und Design Tokens
- Environment-Sicherheit mit Zod
- Umfassende Test-Coverage
- CI/CD Pipeline

## 📋 Voraussetzungen

```bash
# Versionen prüfen
pnpm -v          # ≥ 8.x
node -v          # ≥ 20.x
cursor --version # Latest mit o3 Support

# Git Setup
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Phase 1a: Repo-Analyse & Bereinigung

### 1. Projekt-Setup und Branch erstellen

```bash
# Feature Branch erstellen
git checkout -b feat/phase-1-monorepo

# Dependencies installieren
pnpm install

# Dev Server testen
pnpm dev
```

### 2. Code-Analyse mit Cursor

**Cursor Shortcuts:**
- `⇧⌘E` → "Outline project" für Struktur-Übersicht
- `⌘⇧F` → Global Search für TODO/FIXME/HACK
- `⌥⇧M` → "Update import paths" für Refactoring

**Analyseschritte:**

```bash
# 1. Redundante Dateien identifizieren
find . -name "*.original.*" -o -name "*.backup.*" -o -name "*.old.*"

# 2. Ungenutzte Dependencies
npx depcheck

# 3. Code-Qualität prüfen
pnpm lint
```

### 3. Architekturbericht erstellen

```bash
mkdir -p docs
touch docs/architekturbericht.md
```

**docs/architekturbericht.md:**

```markdown
# VOAI Frontend - Architekturbericht

## 📂 Aktuelle Struktur

### Routing (Next.js App Router)
- `app/layout.tsx` - Root Layout mit Theme Provider
- `app/page.tsx` - Landing Page
- `app/upload/page.tsx` - Upload Interface
- `app/status/page.tsx` - Status Dashboard
- `app/not-found.tsx` - 404 Handler

### UI Komponenten
| Komponente | Pfad | Verwendung |
|------------|------|------------|
| Button | `components/ui/button.tsx` | Primäre Interaktion |
| Card | `components/ui/card.tsx` | Content Container |
| Spinner | `components/ui/spinner.tsx` | Loading States |
| Navigation | `components/Navigation.tsx` | Top Navigation |
| Footer | `components/Footer.tsx` | Site Footer |

### Utilities & Libs
- `lib/security.ts` - CSRF Token Management, Input Sanitization
- `lib/utils.ts` - cn() für Tailwind Merge, formatDate()

### Tests
- `__tests__/lib/security.test.ts` - Einziger Unit Test (Coverage: ~5%)

## 🔴 Gefundene Probleme

### Redundante Dateien
- [ ] `app/page-original.tsx` - Veraltete Version der Landing Page
- [ ] Duplizierte Icon Imports in mehreren Komponenten

### Fehlende Integrationen
- [ ] Kein Supabase Client Setup
- [ ] Keine n8n Workflow Integration
- [ ] Kein Style Dictionary für Design Tokens
- [ ] Keine E2E Tests

### Code-Qualität
- [ ] TypeScript strict mode nicht aktiviert
- [ ] Keine Path Aliases (@ui, @lib)
- [ ] Inkonsistente Error Boundaries

## 📊 Abhängigkeiten-Analyse

### Produktiv genutzt
- next: 15.0.3
- react: 19.0.0-rc
- @radix-ui/*: UI Primitives
- lucide-react: Icons
- framer-motion: Animationen

### Ungenutzt (zu entfernen)
- [Liste nach depcheck Analyse]

## 🎯 Migration Requirements

1. **Monorepo-Struktur**
   ```
   /apps/frontend/     → Next.js App
   /packages/ui/       → Shared Components
   /packages/config/   → Shared Configs
   ```

2. **Design System Alignment**
   - Style Dictionary Integration
   - Token-basierte Farben/Spacing
   - Konsistente Komponenten-API

3. **Testing Strategy**
   - Unit Tests: Jest + RTL
   - Integration: Testing Library
   - E2E: Playwright
   - Visual: Storybook + Chromatic
```

### 4. Bereinigung durchführen

```bash
# Redundante Dateien löschen
rm app/page-original.tsx

# Git Status prüfen
git status

# Changes committen
git add .
git commit -m "chore: remove redundant files and add architecture report"
```

## Phase 1b: Monorepo-Transformation

### 1. Turborepo Setup

```bash
# Turborepo initialisieren (interaktiv)
pnpm dlx create-turbo@latest --example with-tailwind

# Manuelle Struktur erstellen
mkdir -p apps/frontend packages/{ui,config,tsconfig}

# Frontend verschieben
mv app apps/frontend/app
mv components apps/frontend/components
mv lib apps/frontend/lib
mv public apps/frontend/public
mv styles apps/frontend/styles
```

### 2. Root package.json konfigurieren

```json
{
  "name": "voai-enterprise",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "^3.2.4",
    "@types/node": "^20.11.5"
  },
  "packageManager": "pnpm@8.15.1",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### 3. Turbo Konfiguration

**turbo.json:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "env": [
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "NEXT_PUBLIC_SENTRY_DSN"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "env": ["NODE_ENV"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

### 4. Shared UI Package erstellen

**packages/ui/package.json:**

```json
{
  "name": "@voai/ui",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles": "./src/styles/index.css"
  },
  "scripts": {
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.309.0",
    "tailwind-merge": "^2.2.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.47",
    "typescript": "^5.3.3"
  }
}
```

**packages/ui/src/atoms/Button.tsx:**

```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 5. Style Dictionary Setup

**packages/config/tokens/base.json:**

```json
{
  "color": {
    "primary": {
      "50": { "value": "#f0feff" },
      "100": { "value": "#e0fcff" },
      "200": { "value": "#b9f5ff" },
      "300": { "value": "#7deaff" },
      "400": { "value": "#38d8ff" },
      "500": { "value": "#0bbfff" },
      "600": { "value": "#009ed4" },
      "700": { "value": "#007dab" },
      "800": { "value": "#02668d" },
      "900": { "value": "#075574" },
      "950": { "value": "#04364d" }
    },
    "gray": {
      "50": { "value": "#f9fafb" },
      "100": { "value": "#f3f4f6" },
      "200": { "value": "#e5e7eb" },
      "300": { "value": "#d1d5db" },
      "400": { "value": "#9ca3af" },
      "500": { "value": "#6b7280" },
      "600": { "value": "#4b5563" },
      "700": { "value": "#374151" },
      "800": { "value": "#1f2937" },
      "900": { "value": "#111827" },
      "950": { "value": "#030712" }
    }
  },
  "spacing": {
    "xs": { "value": "0.5rem" },
    "sm": { "value": "0.75rem" },
    "md": { "value": "1rem" },
    "lg": { "value": "1.5rem" },
    "xl": { "value": "2rem" },
    "2xl": { "value": "3rem" },
    "3xl": { "value": "4rem" }
  },
  "radius": {
    "sm": { "value": "0.375rem" },
    "md": { "value": "0.5rem" },
    "lg": { "value": "0.75rem" },
    "xl": { "value": "1rem" },
    "2xl": { "value": "1.5rem" },
    "full": { "value": "9999px" }
  },
  "font": {
    "family": {
      "sans": { "value": "Inter, system-ui, -apple-system, sans-serif" },
      "mono": { "value": "JetBrains Mono, monospace" }
    },
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" },
      "5xl": { "value": "3rem" }
    }
  }
}
```

**packages/config/style-dictionary.config.js:**

```javascript
const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{
        destination: 'tokens.d.ts',
        format: 'typescript/es6-declarations'
      }]
    }
  }
};
```

### 6. Environment Setup mit Zod

**.env.example:**

```bash
# App
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# n8n Integration
N8N_API_URL=https://n8n.voai.com
N8N_API_KEY=your-n8n-api-key
N8N_WEBHOOK_URL=https://n8n.voai.com/webhook/offer-ingest

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORG=voai
SENTRY_PROJECT=frontend

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_ENABLE_VECTOR_SEARCH=false

# Vercel (auto-populated in deployment)
VERCEL_URL=
VERCEL_ENV=
```

**apps/frontend/lib/env.ts:**

```typescript
import { z } from 'zod';

const envSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // URLs
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  
  // n8n
  N8N_API_URL: z.string().url(),
  N8N_API_KEY: z.string().min(1),
  N8N_WEBHOOK_URL: z.string().url(),
  
  // Sentry
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  NEXT_PUBLIC_ENABLE_SENTRY: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
    
  // Vercel
  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
});

// Separate schemas for build time vs runtime
const buildEnvSchema = envSchema.pick({
  NODE_ENV: true,
  SENTRY_AUTH_TOKEN: true,
  SENTRY_ORG: true,
  SENTRY_PROJECT: true,
});

const publicEnvSchema = envSchema.pick({
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
  NEXT_PUBLIC_SENTRY_DSN: true,
  NEXT_PUBLIC_POSTHOG_KEY: true,
  NEXT_PUBLIC_POSTHOG_HOST: true,
  NEXT_PUBLIC_ENABLE_ANALYTICS: true,
  NEXT_PUBLIC_ENABLE_SENTRY: true,
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: true,
});

const serverEnvSchema = envSchema.omit({
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
  NEXT_PUBLIC_SENTRY_DSN: true,
  NEXT_PUBLIC_POSTHOG_KEY: true,
  NEXT_PUBLIC_POSTHOG_HOST: true,
  NEXT_PUBLIC_ENABLE_ANALYTICS: true,
  NEXT_PUBLIC_ENABLE_SENTRY: true,
  NEXT_PUBLIC_ENABLE_VECTOR_SEARCH: true,
});

// Type exports
export type Env = z.infer<typeof envSchema>;
export type BuildEnv = z.infer<typeof buildEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Parse and validate
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

// Export validated env
export const env = validateEnv();

// Helper to get public runtime config
export function getPublicEnv(): PublicEnv {
  return publicEnvSchema.parse(env);
}

// Helper to get server runtime config
export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse(env);
}
```

### 7. Umfassende Test Suite

**__tests__/setup.ts:**

```typescript
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills für Node.js
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock Next.js Router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Environment Variables für Tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.N8N_API_URL = 'https://test-n8n.voai.com';
process.env.N8N_API_KEY = 'test-api-key';
```

**__tests__/architecture/monorepo.test.ts:**

```typescript
import fs from 'fs';
import path from 'path';

describe('Monorepo Structure', () => {
  const rootDir = process.cwd();
  
  test('required directories exist', () => {
    const requiredDirs = [
      'apps/frontend',
      'packages/ui',
      'packages/config',
      'packages/tsconfig'
    ];
    
    for (const dir of requiredDirs) {
      expect(fs.existsSync(path.join(rootDir, dir))).toBe(true);
    }
  });
  
  test('workspace configuration is valid', () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
    );
    
    expect(packageJson.workspaces).toEqual(['apps/*', 'packages/*']);
    expect(packageJson.private).toBe(true);
  });
  
  test('turbo.json exists and is valid', () => {
    const turboPath = path.join(rootDir, 'turbo.json');
    expect(fs.existsSync(turboPath)).toBe(true);
    
    const turboConfig = JSON.parse(fs.readFileSync(turboPath, 'utf-8'));
    expect(turboConfig.pipeline).toBeDefined();
    expect(turboConfig.pipeline.build).toBeDefined();
    expect(turboConfig.pipeline.dev).toBeDefined();
    expect(turboConfig.pipeline.test).toBeDefined();
  });
});
```

**__tests__/env/validation.test.ts:**

```typescript
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

describe('Environment Configuration', () => {
  test('.env.example contains all required variables', () => {
    const envExample = dotenv.parse(
      fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf-8')
    );
    
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'N8N_API_URL',
      'N8N_API_KEY',
      'N8N_WEBHOOK_URL'
    ];
    
    for (const varName of requiredVars) {
      expect(envExample[varName]).toBeDefined();
    }
  });
  
  test('env schema validates correctly', async () => {
    // Dynamischer Import für ESM Module
    const { env, getPublicEnv, getServerEnv } = await import(
      '../../apps/frontend/lib/env'
    );
    
    expect(env).toBeDefined();
    expect(env.NODE_ENV).toBe('test');
    
    const publicEnv = getPublicEnv();
    expect(publicEnv.NEXT_PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co');
    
    const serverEnv = getServerEnv();
    expect(serverEnv.N8N_API_KEY).toBe('test-api-key');
  });
  
  test('feature flags parse correctly', async () => {
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'true';
    process.env.NEXT_PUBLIC_ENABLE_SENTRY = 'false';
    
    // Module Cache leeren für fresh import
    jest.resetModules();
    
    const { env } = await import('../../apps/frontend/lib/env');
    
    expect(env.NEXT_PUBLIC_ENABLE_ANALYTICS).toBe(true);
    expect(env.NEXT_PUBLIC_ENABLE_SENTRY).toBe(false);
  });
});
```

**__tests__/ui/components.test.tsx:**

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@voai/ui/atoms/Button';

describe('UI Components', () => {
  describe('Button', () => {
    test('renders with default variant', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-primary');
    });
    
    test('applies variant classes correctly', () => {
      const { rerender } = render(<Button variant="outline">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('border');
      
      rerender(<Button variant="destructive">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-destructive');
    });
    
    test('handles click events', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    test('can be disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50');
    });
  });
});
```

**__tests__/integration/build.test.ts:**

```typescript
import { execSync } from 'child_process';
import path from 'path';

describe('Build Process', () => {
  test('turbo build completes successfully', () => {
    const rootDir = process.cwd();
    
    // Timeout erhöhen für Build
    const result = execSync('pnpm turbo run build --filter=@voai/ui', {
      cwd: rootDir,
      encoding: 'utf-8',
      timeout: 60000 // 60 Sekunden
    });
    
    expect(result).toContain('Tasks:    1 successful');
  }, 70000);
  
  test('type checking passes', () => {
    const result = execSync('pnpm turbo run type-check', {
      encoding: 'utf-8',
      timeout: 30000
    });
    
    expect(result).not.toContain('error TS');
  }, 40000);
});
```

**jest.config.js:**

```javascript
module.exports = {
  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true
      }
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/frontend/$1',
    '^@voai/ui/(.*)$': '<rootDir>/packages/ui/src/$1',
    '^@voai/config/(.*)$': '<rootDir>/packages/config/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  collectCoverageFrom: [
    'apps/frontend/**/*.{ts,tsx}',
    'packages/*/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/dist/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  verbose: true
};
```

### 8. CI/CD Pipeline

**.github/workflows/ci.yml:**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        
      - uses: pnpm/action-setup@v3
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm turbo run lint

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        
      - uses: pnpm/action-setup@v3
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm turbo run type-check

  test:
    name: Test
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      N8N_API_URL: ${{ secrets.N8N_API_URL }}
      N8N_API_KEY: ${{ secrets.N8N_API_KEY }}
      N8N_WEBHOOK_URL: ${{ secrets.N8N_WEBHOOK_URL }}
      
    steps:
      - uses: actions/checkout@v4
        
      - uses: pnpm/action-setup@v3
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm turbo run test -- --coverage
      
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        
      - uses: pnpm/action-setup@v3
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm turbo run build
      
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: apps/frontend/.next

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

**.github/workflows/deploy.yml:**

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v3
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm turbo run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 9. GitHub Secrets einrichten

In GitHub Repository Settings → Secrets and variables → Actions:

```yaml
# Required Secrets
NEXT_PUBLIC_SUPABASE_URL: https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJ...
SUPABASE_SERVICE_ROLE_KEY: eyJ...
N8N_API_URL: https://n8n.voai.com
N8N_API_KEY: n8n_api_...
N8N_WEBHOOK_URL: https://n8n.voai.com/webhook/offer-ingest
SENTRY_AUTH_TOKEN: sntrys_...
VERCEL_TOKEN: ...
VERCEL_ORG_ID: team_...
VERCEL_PROJECT_ID: prj_...
TURBO_TOKEN: ...
CODECOV_TOKEN: ...
SNYK_TOKEN: ...

# Variables
TURBO_TEAM: voai
```

### 10. Finale Tests & Commit

```bash
# Alle Tests durchlaufen
pnpm install
pnpm lint
pnpm type-check
pnpm test
pnpm build

# Coverage Report prüfen
open coverage/lcov-report/index.html

# Finale Commits
git add .
git commit -m "feat(monorepo): complete phase 1 implementation

- Turborepo structure with apps/frontend and packages/*
- Shared UI library with atomic components
- Style Dictionary for design tokens
- Zod-validated environment configuration
- Comprehensive test suite (>70% coverage)
- GitHub Actions CI/CD pipeline
- All secrets configured and validated"

git push origin feat/phase-1-monorepo

# Pull Request erstellen
gh pr create \
  --title "Phase 1: Monorepo Architecture & Foundation" \
  --body "$(cat docs/PHASE-1-IMPLEMENTATION.md)" \
  --base main
```

## Abschluss-Checkliste Phase 1 ✅

- [ ] Monorepo-Struktur mit Turborepo
- [ ] Shared UI Package mit atomaren Komponenten
- [ ] Style Dictionary für Design Tokens
- [ ] Environment Variables mit Zod Schema
- [ ] Test Coverage > 70%
- [ ] CI/CD Pipeline läuft grün
- [ ] Alle Secrets in GitHub hinterlegt
- [ ] Dokumentation vollständig
- [ ] PR erstellt und Review angefordert

## Nächste Schritte

Nach erfolgreichem Merge von Phase 1:

1. **Phase 2**: UI-Komponenten vervollständigen (DataTable, Sidebar, Charts)
2. **Phase 3**: Routing & Seitenaufbau mit Protected Routes
3. **Phase 4**: Supabase Integration (Auth, RLS, Realtime)
4. **Phase 5**: n8n Workflow Integration

Viel Erfolg! 🚀