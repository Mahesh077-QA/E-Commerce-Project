import {test, expect} from '@playwright/test'
import {dashboard} from '../../POM/admin/dashboard.po'
import { adminLogin } from '../../POM/admin/loginpage.po'
import admindata from '../../testdata/admin/admindata.json'

let login
let dashboardpage

test.beforeEach(async ({page})=>{
    login = new adminLogin(page)
    dashboardpage = new dashboard(page)

    await login.launchLoginPage()
})

test('verify total balance and all accounts balance', async({page})=>{

    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await dashboardpage.verifyTotalNetWerth();
})

test('verify quick transfer link', async({page})=>{

    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await dashboardpage.verifytransferlink()
})

test('verify billpay link', async({page})=>{
    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await dashboardpage.verifybillpaylink()
})

test('verify theam toggule dark and light modes', async({page})=>{
    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await dashboardpage.verifydarktheme()
    await dashboardpage.verifylighttheam()
})

test.only('verify recent transactions', async({page})=>{
    await login.fillLogindetails(admindata.adminUserName, admindata.adminPassword)
    await login.signinclick()
    await expect(page.getByText('Welcome back, Admin')).toBeVisible()
    await expect(page.locator('h2[class="text-sm font-semibold text-slate-700 dark:text-slate-300"]')).toHaveText('Recent Transactions')
    
    let recenttranscations = await page.locator('table[data-testid="recent-transactions-table"]>tbody>tr').count()
    await expect(recenttranscations).toBe(5)
})