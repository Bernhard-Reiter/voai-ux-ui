module.exports = {
  // Claude Flow Configuration
  apiKey: process.env.CLAUDE_FLOW_API_KEY || '-wAYocA4-aQBbYnHWvidN58SXK-Hd7oeMSQqFTUZ',
  
  // Repository Configuration
  repository: {
    owner: 'Bernhard-Reiter',
    name: 'voai-ux-ui',
    mainBranch: 'main'
  },
  
  // Auto-merge Configuration
  autoMerge: {
    enabled: true,
    requireAllChecks: true,
    requiredChecks: [
      'lint-and-test',
      'security-scan',
      'claude-flow-analysis'
    ],
    mergeMethod: 'squash',
    deleteAfterMerge: true,
    
    // Labels
    enableLabels: ['ready-to-merge'],
    blockLabels: ['do-not-merge', 'work-in-progress'],
    
    // Conditions
    conditions: {
      minApprovals: 0, // Set to 1 for production
      maxConflicts: 0,
      minTestCoverage: 80,
      maxAge: 7 // days
    }
  },
  
  // Monitoring Configuration
  monitoring: {
    enabled: true,
    interval: '15m',
    
    // Metrics to track
    metrics: [
      'ci_success_rate',
      'pr_merge_time',
      'deploy_frequency',
      'build_duration',
      'test_coverage'
    ],
    
    // Alerts
    alerts: {
      ciFailureThreshold: 3,
      prAgeThreshold: 7,
      deployFailureAlert: true
    }
  },
  
  // Deployment Configuration
  deployment: {
    autoDeployOnMerge: true,
    provider: 'vercel',
    
    environments: {
      production: {
        branch: 'main',
        url: 'https://app.voai.com',
        healthCheck: '/api/health'
      },
      staging: {
        branch: 'staging',
        url: 'https://staging.voai.com',
        healthCheck: '/api/health'
      }
    }
  },
  
  // Code Review Configuration
  codeReview: {
    enabled: true,
    
    // What to check
    checks: {
      security: true,
      performance: true,
      bestPractices: true,
      accessibility: true,
      typeScript: true
    },
    
    // Automated fixes
    autoFix: {
      formatting: true,
      imports: true,
      simpleErrors: true
    }
  },
  
  // Notification Configuration
  notifications: {
    email: {
      enabled: true,
      recipients: ['bernhard@voai.de'],
      
      events: [
        'merge_success',
        'deploy_success',
        'ci_failure',
        'security_alert'
      ]
    },
    
    slack: {
      enabled: false,
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      channel: '#ci-cd'
    }
  },
  
  // Security Configuration
  security: {
    scanDependencies: true,
    scanCode: true,
    blockHighSeverity: true,
    
    // Allowed licenses
    allowedLicenses: [
      'MIT',
      'Apache-2.0',
      'BSD-3-Clause',
      'ISC'
    ]
  }
}