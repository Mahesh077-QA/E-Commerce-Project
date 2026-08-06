import { test } from '@playwright/test';
import { RegisterPage } from '../POM/register.po.js';
import registerData from '../testdata/registerdata.json';

let registerPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.launchRegisterPage();
});

test('register with valid data', async () => {
  await registerPage.fillRegistrationForm(registerData.validUser);
  await registerPage.submitRegistration();
  await registerPage.verifyRegistrationSuccess();
});

test('register with duplicate username', async () => {
  await registerPage.fillRegistrationForm(registerData.duplicateUser);
  await registerPage.submitRegistration();
  await registerPage.verifyErrorMessage('This username already exists');
});

test('register with mismatched password confirmation', async () => {
  await registerPage.fillRegistrationForm(registerData.mismatchPasswordUser);
  await registerPage.submitRegistration();
  await registerPage.verifyErrorMessage('Passwords did not match');
});

test('register with empty required fields', async () => {
  await registerPage.submitRegistration();
  await registerPage.verifyErrorMessage('First name is required');
  await registerPage.verifyErrorMessage('Last name is required');
});
