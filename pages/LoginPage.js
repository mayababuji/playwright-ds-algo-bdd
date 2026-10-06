export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox',{name:'Username'});
    this.passwordInput = page.getByRole('textbox',{name:'Password'});

    this.loginButton = page.getByRole('button', {
      name: /login/i
    });
    this.successMessage = page.getByText('You are logged in');
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
   async login(username, password) {
//    const snapshot = await this.page.locator('body').ariaSnapshot();

// console.log('\n===== BODY ARIA SNAPSHOT =====');
// console.log(snapshot);
// console.log('===== END BODY ARIA SNAPSHOT =====\n');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}