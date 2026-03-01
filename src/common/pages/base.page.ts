import { Page } from '@playwright/test';
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
}
