export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', {
      name: /login/i
    });
    this.dashboard = page.getByText('Dashboard');
  }

  async open() {
    await this.page.goto('/login');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async expectDashboardVisible() {
    await this.dashboard.waitFor({ state: 'visible' });
  }
}