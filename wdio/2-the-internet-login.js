describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await browser.url(`https://the-internet.herokuapp.com/login`)

    const userElm = await $('#username')
    userElm.setValue('tomsmith')

    const passElm = await $('#password')
    passElm.setValue('SuperSecretPassword!')

    const buttonElm = await $('button[type="submit"]')
    buttonElm.click()

    await expect($('#flash')).toBeExisting()
    await expect($('#flash')).toHaveTextContaining(
        'You logged into a secure area!')
  })
})

