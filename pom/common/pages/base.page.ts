import { Locator, Page } from '@playwright/test';
import config from 'playwright.config';

export abstract class BasePage {
  protected readonly page: Page;
  protected abstract route: string;

  constructor(page: Page) {
    this.page = page;
  }

  get getFullUrl(): string {
    const url = new URL(this.route, config.use.baseURL);
    return url.href;
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.route);
    await this.waitForPageToLoad();
  }

  abstract waitForPageToLoad(): Promise<void>;

  get globalToastMessage(): Locator {
    return this.page.locator('.oxd-toast-content-text');
  }

  getFieldWrapperByText(fieldText: string): Locator {
    return this.page.locator('.oxd-input-group').filter({
      has: this.page.getByText(fieldText),
    });
  }

  getFieldInputByText(fieldText: string): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText(fieldText),
      })
      .locator('input');
  }

  getFieldErrorByText(fieldText: string): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText(fieldText),
      })
      .locator('.oxd-input-field-error-message');
  }

  getSpecificErrorLocator(errorType: string, text?: string): Locator {
    if (errorType === 'toast') {
      return this.globalToastMessage;
    }

    if (errorType === 'field' && text) {
      return this.getFieldErrorByText(text);
    }

    throw new Error(`BasePage cannot map errorType: ${errorType}`);
  }
}
