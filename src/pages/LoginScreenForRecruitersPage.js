// src/pages/LoginScreenForRecruitersPage.js
class LoginScreenForRecruitersPage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    if (!url) throw new Error("url required");
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    if (!email) throw new Error("email required");
    if (!password) throw new Error("password required");

    const emailInput = this.page.getByLabel('Email');
    const passwordInput = this.page.getByLabel('Password');
    const loginBtn = this.page.getByRole('button', { name: 'Login' });

    await emailInput.fill(email);
    await passwordInput.fill(password);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      loginBtn.click(),
    ]);
  }

  async clickGetStarted() {
    const getStartedBtn = this.page.getByRole('button', { name: 'Get Started' });
    await getStartedBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickContinueAsOrganization() {
    const continueBtn = this.page.getByRole('button', { name: 'Continue as Organization' });
    await continueBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async toggleShowHidePassword() {
    const toggleBtn = this.page.getByRole('button', { name: 'Show/Hide Password' });
    await toggleBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isLoginButtonEnabled() {
    const loginBtn = this.page.getByRole('button', { name: 'Login' });
    return await loginBtn.isEnabled();
  }
}

module.exports = { LoginScreenForRecruitersPage };