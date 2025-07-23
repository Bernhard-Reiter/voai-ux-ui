const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

// Configure image snapshot settings
const customConfig = {
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: 0.1,
  },
  blur: 1,
}
