import { BasePage } from 'pom/common/pages/base.page';
import { ROUTES } from 'pom/common/routes';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  protected route = ROUTES.AUTH.LOGIN;

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([this.loginButton.waitFor({ state: 'visible' })]);
  }

  // Buttons and Links
  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }
  get forgotYourPassword() {
    return this.page.getByText('Forgot your password?');
  }

  override getSpecificErrorLocator(errorType: string, text?: string) {
    if (errorType === 'login-alert') {
      return this.page.locator('.orangehrm-login-error').getByRole('alert');
    }
    return super.getSpecificErrorLocator(errorType, text);
  }

  // Actions
  async login(username: string, password: string): Promise<void> {
    await super.getFieldInputByText('Username').fill(username);
    await super.getFieldInputByText('Password').fill(password);
    await this.loginButton.click();
  }
}
