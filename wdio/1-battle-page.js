const title = 'BattlePage by Canarytrace'

describe('Battle Page', () => {
  it('should only open', async () => {
    await browser.url(`https://battle.canarytrace.com/`)

    await expect(browser).toHaveTitleContaining(title)
  })
})

