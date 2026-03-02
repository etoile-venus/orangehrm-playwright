import { BasePage } from 'pom/common/pages/base.page';
import { ROUTES } from 'pom/common/routes';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  protected route = ROUTES.AUTH.LOGIN;

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([
      this.usernameInput.waitFor({ state: 'visible' }),
      this.passwordInput.waitFor({ state: 'visible' }),
      this.loginButton.waitFor({ state: 'visible' }),
    ]);
  }
  // Elements
  get usernameInput() {
    return this.page.getByPlaceholder('Username');
  }
  get passwordInput() {
    return this.page.getByPlaceholder('Password');
  }

  // Buttons and Links
  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }
  get forgotYourPassword() {
    return this.page.getByText('Forgot your password?');
  }

  // Messages
  get usernameRequiredMessage() {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Username', { exact: true }),
      })
      .locator('.oxd-input-field-error-message');
  }
  get passwordRequiredMessage() {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Password', { exact: true }),
      })
      .locator('.oxd-input-field-error-message');
  }
  get alertMessage() {
    return this.page.locator('.orangehrm-login-error').getByRole('alert');
  }

  // Actions
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
