import fs from 'fs'
import path from 'path'

describe('Monorepo Structure', () => {
  const rootDir = process.cwd()

  test('required directories exist', () => {
    const requiredDirs = ['apps/frontend', 'packages/ui', 'packages/config', 'packages/tsconfig']

    for (const dir of requiredDirs) {
      expect(fs.existsSync(path.join(rootDir, dir))).toBe(true)
    }
  })

  test('workspace configuration is valid', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'))

    expect(packageJson.workspaces).toEqual(['apps/*', 'packages/*'])
    expect(packageJson.private).toBe(true)
  })

  test('turbo.json exists and is valid', () => {
    const turboPath = path.join(rootDir, 'turbo.json')
    expect(fs.existsSync(turboPath)).toBe(true)

    const turboConfig = JSON.parse(fs.readFileSync(turboPath, 'utf-8'))
    expect(turboConfig.tasks).toBeDefined()
    expect(turboConfig.tasks.build).toBeDefined()
    expect(turboConfig.tasks.dev).toBeDefined()
    expect(turboConfig.tasks.test).toBeDefined()
  })

  test('pnpm-workspace.yaml exists', () => {
    const workspacePath = path.join(rootDir, 'pnpm-workspace.yaml')
    expect(fs.existsSync(workspacePath)).toBe(true)
  })

  test('all packages have valid package.json', () => {
    const packages = ['apps/frontend', 'packages/ui', 'packages/config', 'packages/tsconfig']

    for (const pkg of packages) {
      const packageJsonPath = path.join(rootDir, pkg, 'package.json')
      expect(fs.existsSync(packageJsonPath)).toBe(true)

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      expect(packageJson.name).toBeDefined()
      expect(packageJson.version).toBeDefined()
    }
  })
})
