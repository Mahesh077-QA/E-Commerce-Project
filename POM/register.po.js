import { expect } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
  }

  async launchRegisterPage() {
    await this.page.goto(process.env.REGISTER_URL);
  }

  async fillRegistrationForm(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.confirmPassword);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.locator('h1.title')).toContainText('Welcome');
  }

  async verifyErrorMessage(message) {
    await expect(this.page.locator('body')).toContainText(message);
  }
}
