import { execSync } from 'child_process'
import path from 'path'

describe('Build Process', () => {
  const rootDir = process.cwd()

  test('pnpm install completes successfully', () => {
    expect(() => {
      execSync('pnpm install --frozen-lockfile', {
        cwd: rootDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      })
    }).not.toThrow()
  }, 120000) // 2 minutes timeout

  test('turbo build for UI package completes', () => {
    const result = execSync('pnpm turbo run build --filter=@voai/ui', {
      cwd: rootDir,
      encoding: 'utf-8',
      timeout: 60000,
    })

    expect(result).toBeTruthy()
  }, 70000)

  test('type checking passes', () => {
    expect(() => {
      execSync('pnpm turbo run type-check', {
        cwd: rootDir,
        encoding: 'utf-8',
        timeout: 30000,
      })
    }).not.toThrow()
  }, 40000)

  test('linting passes', () => {
    expect(() => {
      execSync('pnpm turbo run lint', {
        cwd: rootDir,
        encoding: 'utf-8',
        timeout: 30000,
      })
    }).not.toThrow()
  }, 40000)

  test('design tokens build successfully', () => {
    expect(() => {
      execSync('pnpm run build', {
        cwd: path.join(rootDir, 'packages/config'),
        encoding: 'utf-8',
        timeout: 10000,
      })
    }).not.toThrow()
  }, 15000)
})
