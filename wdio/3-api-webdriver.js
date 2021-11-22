describe('Webdriver & Browser API', () => {
  it('open page', async () => {
    await browser.url(`https://the-internet.herokuapp.com`)
  })

  it('most common commands', async () => {
    console.log(await browser.getUrl())

    console.log(await browser.getTitle())

    const elemH1 = "//*[contains(text(),'Welcome to the-internet')]"
    await expect($(elemH1)).toBeDisplayed()
    console.log(`Exist H1 element? ${await $(elemH1).isDisplayed()}`)

    const titleText = await $('//h1').getText()
    console.log(`Page has title: ${titleText}`)

    const abtestElm = await $('//a[@href="/abtest"]')
    await abtestElm.waitForExist({timeoutMsg: 'Link is not available.'});
  })

  it('should save a screenshot of the browser view', async () => {
    await browser.saveScreenshot('./screenshot.png');
  })

  it('form activities', async () => {
    await browser.url('https://the-internet.herokuapp.com/login')

    const userElm = await $('#username')
    await userElm.setValue('some value')

    console.log(`Input field has value: ${await $('#username').getValue()}`)
  })

  it('execute', async () => {
    await browser.executeAsync((done) => {
      alert("test execute async")
      done()
    })

    await browser.pause(4000)
  })

  it('debug', async() => {
    await browser.debug()
  })
})