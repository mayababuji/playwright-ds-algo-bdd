export class HomePage {
  constructor(page) {
    this.page = page;

    this.getStartedButton = page.getByRole('button', {
      name: 'Get Started'
    });

    this.signInLink = page.getByRole('link', {
      name: 'Sign in'
    });
  }

  async open() {
    await this.page.goto('/');
  }

  async clickSignIn() {
    await this.getStartedButton.click();
    await this.signInLink.click();
  }
}