import { BasePage } from '@common/pages/base.page';
import { ROUTES } from '@common/routes';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  protected route = ROUTES.AUTH.LOGIN;

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([
      this.usernameField.waitFor({ state: 'visible' }),
      this.passwordField.waitFor({ state: 'visible' }),
      this.loginButton.waitFor({ state: 'visible' }),
    ]);
  }
  // Elements
  get usernameField() {
    return this.page.getByPlaceholder('Username');
  }
  get passwordField() {
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
    return this.page.locator('.oxd-form-row').nth(0).getByText('Required');
  }
  get passwordRequiredMessage() {
    return this.page.locator('.oxd-form-row').nth(1).getByText('Required');
  }
  get alertMessage() {
    return this.page.locator('.orangehrm-login-error').getByRole('alert');
  }

  // Actions
  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
