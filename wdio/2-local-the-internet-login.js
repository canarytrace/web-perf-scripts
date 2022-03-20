describe('More steps and login', () => {
  it('open page', async () => {
    await browser.url(`https://the-internet.herokuapp.com/login`)
  })

  it('login', async () => {
    const userElm = await $('#username')
    await userElm.setValue('tomsmith')

    const passElm = await $('#password')
    await passElm.setValue('SuperSecretPassword!')

    const buttonElm = await $('button[type="submit"]')
    buttonElm.click()

    await expect($('#flash')).toBeExisting()
    await expect($('#flash')).toHaveTextContaining(
        'You logged into a secure area!')
  })
})

