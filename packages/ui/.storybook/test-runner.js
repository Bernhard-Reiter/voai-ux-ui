const { toMatchImageSnapshot } = require('jest-image-snapshot')
const { getStoryContext } = require('@storybook/test-runner')

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },
  async postVisit(page, context) {
    // Remove any cursor/selection visual artifacts
    await page.evaluate(() => {
      document.body.classList.remove('cursor-selection')
    })

    // Take screenshot of the story
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: `__image_snapshots__`,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  },
}
