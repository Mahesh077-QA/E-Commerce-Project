import { expect } from "@playwright/test";

export class loginpage{

constructor(page){
    this.page = page

    this.usernameinput = page.locator('#username')
    this.passwordinput = page.locator('#password')
    this.loginbuttoninput = page.locator('#login-btn')
    this.rememberinput = page.locator('#remember-me')
    this.clearbuttoninput = page.locator('#clear-btn')
    this.verifydashboard = page.locator('#nav-dashboard')
    this.verifylogin = page.locator('#username-display')
}
async launchURL(){
    await this.page.goto(process.env.BASE_URL)
}

async loginWithCreds(username,password){
    await this.usernameinput.fill(username)
    await this.passwordinput.fill(password)
}

async clickLoginButton(){
    await this.loginbuttoninput.click()
}

async verifyDashBoard(){
    await expect(this.verifydashboard).toHaveText('📊 Dashboard')
}

async verifyadmintext(){
    await expect(this.verifylogin).toHaveText('admin')
}
async verifyviewertext(){
    await expect(this.verifylogin).toHaveText('viewer')
}

async loginErrorMassage(){
    await expect(this.page.getByText('Invalid username or password. Please try again.')).toBeVisible()
}

async requiredErrorMassage(){
    await expect(this.page.getByText('Username is required')).toBeVisible()
    await expect(this.page.getByText('Password is required')).toBeVisible()
}

async clearCreds(){
    await this.clearbuttoninput.click()
}

async pressEnter() {
    await this.page.keyboard.press('Enter')
}


}