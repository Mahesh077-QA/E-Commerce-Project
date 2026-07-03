import {test, expect} from '@playwright/test';
import { loginpage } from '../POM/login.po.js';
import logindata from '../testdata/logindata.json';

let LoginPage
test.beforeEach(async({page})=>{
    LoginPage = new loginpage(page)

    await LoginPage.launchURL()
})

test('login as admin with valid creds', async()=>{
    
    await LoginPage.loginWithCreds(logindata.adminusername, logindata.adminpassword)
    await LoginPage.clickLoginButton()
    await LoginPage.verifyDashBoard()
    await LoginPage.verifyadmintext()
})

test('login as viewer with valid creds', async()=>{
     await LoginPage.loginWithCreds(logindata.viewerusername, logindata.viewerpassword)
     await LoginPage.clickLoginButton()
     await LoginPage.verifyDashBoard()
     await LoginPage.verifyviewertext()
})

test('verify login error massage with invalid creds',async()=>{
    await LoginPage.loginWithCreds(logindata.wrongusername, logindata.wrongpassword)
    await LoginPage.clickLoginButton()
    await LoginPage.loginErrorMassage()
})

test('verify login error massage with valid username and invalid password', async()=>{
    await LoginPage.loginWithCreds(logindata.adminusername, logindata.wrongpassword)
    await LoginPage.clickLoginButton()
    await LoginPage.loginErrorMassage()
})

test('verify login error massage with invalid username and valid password', async()=>{
    await LoginPage.loginWithCreds(logindata.wrongusername, logindata.adminpassword)
    await LoginPage.clickLoginButton()
    await LoginPage.loginErrorMassage()
})

test('verify login require error massage without creds', async()=>{
    await LoginPage.clickLoginButton()
    await LoginPage.requiredErrorMassage()
})

test('login as admin with valid creds without click on loginbutton', async()=>{
    
    await LoginPage.loginWithCreds(logindata.adminusername, logindata.adminpassword)
    await LoginPage.pressEnter()
    await LoginPage.verifyDashBoard()
    await LoginPage.verifyadmintext()
})
