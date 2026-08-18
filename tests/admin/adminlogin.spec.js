import {expect, test} from '@playwright/test'
import {adminLogin} from '../../POM/admin/loginpage.po'
import admindata from '../../testdata/admin/admindata.json'

let login

test.beforeEach(async ({ page }) => {
  login = new adminLogin(page);

  await login.launchLoginPage()
});

test('login as a admin with valid creds', async({page}) =>{
    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
})

test('login as a admin with invalid creds', async({page}) =>{
    await login.fillLogindetails(admindata.adminInvalidUserName, admindata.adminInvalidPassword)
    await login.signinclick()
    await expect(page.getByText('The username or password you entered is incorrect.')).toBeVisible()
})

test('login as a admin with invalid username and valid password', async({page}) =>{
    await login.fillLogindetails(admindata.adminInvalidUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('The username or password you entered is incorrect.')).toBeVisible()
})

test('login as a admin with valid username and invalid password', async({page}) =>{
    await login.fillLogindetails(admindata.adminUserName, admindata.adminInvalidPassword)
    await login.signinclick()
    await expect(page.getByText('The username or password you entered is incorrect.')).toBeVisible()
})

