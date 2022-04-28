import { expect, test } from '@playwright/test'

test.describe('Components throw no error upon initialization', () => {
  test('Introduction', async ({ page }) => {
    page.on('console', message => {
      if (message.type() === 'error') {
        console.error(message.text())
        expect(message.text()).toBeFalsy()
      }
    })
    await page.goto('http://localhost:3000/docs/introduction/getting-started')

    const examples = await page.$$('.example-wrapper')

    for (const example of examples) {
      await example.click()
    }
  })
})
