import {test, expect} from '@playwright/test'
import {dashboard} from '../../POM/admin/dashboard.po'
import { adminLogin } from '../../POM/admin/loginpage.po'
import {accounts} from '../../POM/admin/accounts.po'
import admindata from '../../testdata/admin/admindata.json'

let login
let dashboardpage
let accountspage

test.beforeEach(async ({page})=>{
    login = new adminLogin(page)
    dashboardpage = new dashboard(page)
    accountspage = new accounts(page)
    await login.launchLoginPage()
})

test('verify accounts are listed or not',async({page}) =>{

    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await accountspage.clickaccounts()
    await accountspage.verifyCheckingaccount()
    await accountspage.verifySavingsaccount()

})

test('verifyaccounts details', async ({page}) =>{

    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await accountspage.clickaccounts()
    await accountspage.verifyAccountname()
    await accountspage.verifyAccountnumber()
})

test('verify overdraft banner', async ({page}) =>{

  await login.fillLogindetails('overdraft_user', 'bank_sauce')
  await login.signinclick()
  await accountspage.clickaccounts()
  await expect(page.locator('span[data-testid="account-row-overdrawn"]')).toBeVisible()
})

test('verify frozen account banner', async ({page}) =>{

  await login.fillLogindetails('frozen_user', 'bank_sauce')
  await login.signinclick()
  await accountspage.clickaccounts()
  await expect(page.locator('div[data-testid="frozen-account-banner"]')).toBeVisible()
})

test('verify add account', async ({page}) =>{

  await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await accountspage.clickaccounts()
    await accountspage.verifyaddaccount()

})