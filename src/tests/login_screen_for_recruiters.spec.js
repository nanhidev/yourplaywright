// src/tests/loginscreenforrecruiters.spec.js
const { test, expect } = require('@playwright/test');
const { LoginScreenForRecruitersPage } = require('../pages/LoginScreenForRecruitersPage.js');

test.describe('LoginScreenForRecruiters Test Suite', () => {
  let page;
  const url = 'https://yourapp.com'; // Replace with actual URL

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginScreenForRecruitersPage = new LoginScreenForRecruitersPage(page);
    await loginScreenForRecruitersPage.navigateTo(url);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('should complete LoginScreenForRecruiters flow', async () => {
    const loginScreenForRecruitersPage = new LoginScreenForRecruitersPage(page);

    await loginScreenForRecruitersPage.clickGetStarted();
    await loginScreenForRecruitersPage.clickContinueAsOrganization();
    
    await loginScreenForRecruitersPage.login('recruiter@example.com', 'SecurePassword123');
    
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should show/hide password correctly', async () => {
    const loginScreenForRecruitersPage = new LoginScreenForRecruitersPage(page);
    
    await page.getByLabel('Password').fill('P@ssw0rd123');
    await loginScreenForRecruitersPage.toggleShowHidePassword();
    // Add assertion to verify password visibility if needed
    await loginScreenForRecruitersPage.toggleShowHidePassword();
    // Add assertion to verify password is hidden if needed
  });

  test('should enable Login button when inputs are filled', async () => {
    const loginScreenForRecruitersPage = new LoginScreenForRecruitersPage(page);
    
    await page.getByLabel('Email').fill('krishna@gmail.com');
    await page.getByLabel('Password').fill('SecurePassword123');
    
    const isEnabled = await loginScreenForRecruitersPage.isLoginButtonEnabled();
    expect(isEnabled).toBe(true);
  });

  // Additional tests for various email formats and browser testing can be added here
});