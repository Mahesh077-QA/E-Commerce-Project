import { expect } from "@playwright/test";

export class dashboard {
  constructor(page) {
    this.page = page;

    this.totalNetWerth = page.locator(
      'p[data-testid="stat-card-net-worth-value"]',
    );

    this.accountsbutton = page.locator('a[data-nav="accounts"]');

    this.accountsBalance = page.locator(
      '//tr[@data-testid="account-row"]//td[3]',
    );

    this.transferbutton = page.locator('a[data-nav="transfer"]')

    this.billpaybutton = page.locator('a[data-nav="bill-pay"]')

    this.theamtoggulebutton = page.locator('button[class="nav-module__Efbrta__themeToggle"]')

    

  
  }

  async verifyTotalNetWerth() {
    const totalNetWerthText = await this.totalNetWerth.textContent();

    let totalNetWerthBalance = parseFloat(
      totalNetWerthText.replace(/[$,]/g, ""),
    );

    await this.accountsbutton.click();
    await this.accountsBalance.first().waitFor({ state: "visible" });
    const count = await this.accountsBalance.count();

    console.log("Count:", count);

    let totalAccountsBalance = 0;

    for (let i = 0; i < count; i++) {
      const balanceText = await this.accountsBalance.nth(i).textContent();

      const balance = parseFloat(balanceText.replace(/[$,]/g, ""));

      totalAccountsBalance += balance;
    }

    console.log("Accounts Total:", totalAccountsBalance);
    console.log("Net Worth:", totalNetWerthBalance);

    expect(totalAccountsBalance).toBe(totalNetWerthBalance);
  }

  async verifytransferlink(){
    await this.transferbutton.click()
    await expect(this.page).toHaveURL('https://qaplayground.com/bank/transfer')
  }

  async verifybillpaylink(){
    await this.billpaybutton.click()
    await expect(this.page).toHaveURL('https://qaplayground.com/bank/bill-pay')
  }

  async verifydarktheme(){
    await this.theamtoggulebutton.click()
    await expect(this.page.locator('button[aria-label="Switch to light mode"]'))
  }

  async verifylighttheam(){
    await this.theamtoggulebutton.click()
    await expect(this.page.locator('button[aria-label="Switch to dark mode"]'))
  }
}
