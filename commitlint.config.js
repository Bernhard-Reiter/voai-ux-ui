module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Neue Features
        'fix',      // Bugfixes
        'docs',     // Dokumentation
        'style',    // Code-Style (Formatierung)
        'refactor', // Code-Refactoring
        'perf',     // Performance-Verbesserungen
        'test',     // Tests
        'build',    // Build-System
        'ci',       // CI/CD
        'chore',    // Sonstige Aufgaben
        'revert'    // Revert eines Commits
      ]
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72]
  }
};