import { expect } from "@playwright/test";

export class accounts {
  constructor(page) {
    this.page = page;

    this.checkingaccount = page.getByText('Everyday Checking')
    this.savingsaccount = page.getByText('High-Yield Savings')
    this.accountname = page.getByText('Everyday Checking')
    this.accountnumber = page.locator('(//p[@class="font-mono text-xs text-slate-500"])[1]')
    this.accountsbutton = page.locator('a[data-testid="sidebar-link-accounts"]')
    this.addaccountbutton = page.locator('button[data-testid="add-account-btn"]')
    this.addaccountname = page.locator('input[data-testid="account-form-name-input"]')
    this.addaccounttype = page.locator('span[data-slot="select-value"]')
    this.savingsaccountbutton = page.locator('div[data-account-type="savings"]')
    this.addstartingbalance = page.locator('(//input[@data-slot="input"])[2]')
    this.addtermscheckbox = page.locator('span[role="checkbox"]')
    this.addaccount = page.locator('button[data-testid="save-account-form-btn"]')
  }

  async clickaccounts(){
    await this.accountsbutton.click()
  }

  async verifyCheckingaccount(){

    await expect(this.checkingaccount).toBeVisible()
  }

  async verifySavingsaccount(){

    await expect(this.savingsaccount).toBeVisible()
  }

  async verifyAccountname(){

    await expect(this.accountname).toBeVisible()
  }

  async verifyAccountnumber(){

    await expect(this.accountnumber).toHaveText(/^\*{4}\d{4}$/);
  }

  async verifyaddaccount(){

    await this.addaccountbutton.click()
    await this.addaccountname.fill('Testing Account')
    await this.addaccounttype.click()
    await this.savingsaccountbutton.click()
    await this.addstartingbalance.fill('100')
    await this.addtermscheckbox.check()
    await this.addaccount.click()
    await expect(this.page.getByText('Testing Account')).toBeVisible()
  }

}