describe('Mixit', () => {
  it('open mixit homepage', async () => {
    await browser.url('https://www.mixit.cz/')
  })

  it('performance audit', async () => { await browser.performAudit(await browser.getUrl()) })

  it('remove cookie bar if exist', async () => {
    const cookieBarElm = await $('//div[contains(@class,"cookie-bar")]//button[contains(text(),"OK")]')
    cookieBarElm.click()
  })

  it('select ready mixit', async () => {
    // main menu
    const readyMixitButton = await $('//button[@aria-controls="megamenu--homepage--ready"]')
    readyMixitButton.click()

    // sub menu
    const driedFruitsLinkElm = await $('(//a[@href="/hotove-mixit/suche-plody"])[1]')
    await expect(driedFruitsLinkElm).toBeDisplayed()
    driedFruitsLinkElm.click()

    // page is opened
    const h1Elm = await $('//h1[contains(text(), "Ovoce, oříšky a čoko")]')
    await expect(h1Elm).toBeDisplayed()
  })

  it('select first product', async () => {
    const productMenuElm = await $('((//main[@id="main"]//ul)[2]/li)[1]')
    await expect(productMenuElm).toBeDisplayed()
    productMenuElm.click()

    const heroTitleElm = await $('//h1[contains(@class, "product-hero__title")]')
    await expect(heroTitleElm).toBeDisplayed()
    heroTitleElm.click()
  })

  it('performance audit', async () => { await browser.performAudit(await browser.getUrl()) })

})

