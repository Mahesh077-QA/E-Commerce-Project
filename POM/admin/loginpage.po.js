import {expect} from '@playwright/test'

 export class adminLogin {
    constructor (page){
        this.page = page

        this.userNameInput = page.locator('input[placeholder="Enter username"]')
        this.passwordInput = page.locator('input[placeholder="Enter password"]')
        this.signinButton = page.locator('button[type="submit"]')
        this.remembermeCheckbox = page.locator('span[data-slot="checkbox"]')
        this.forgotpasswordButton = page.locator('a[data-testid="forgot-password-link"]')
        this.hidepasswordButton = page.locator('button[tabindex="-1"]')
    }

    async launchLoginPage() {
    await this.page.goto(process.env.BASE_URL);
  }

  async fillLogindetails(username,password){
     await this.userNameInput.fill(username)
     await this.passwordInput.fill(password)
  }

  async signinclick(){
    await this.signinButton.click()
  }

  async rememberme(){
    await this.remembermeCheckbox.check()
  }

  async forgetpassword(){
    await this.forgotpasswordButton.click()
  }

 async hidePassword(){
    await this.hidepasswordButton.clicl()
 }
 }