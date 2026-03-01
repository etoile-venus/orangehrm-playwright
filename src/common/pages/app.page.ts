import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '@common/components/header.component';

export abstract class AppPage extends BasePage {
  public readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }
}
