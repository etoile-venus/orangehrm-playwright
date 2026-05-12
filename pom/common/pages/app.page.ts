import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from 'pom/common/components/header.component';
import { SidebarComponent } from 'pom/common/components/sidebar.component';

export abstract class AppPage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly sidebar: SidebarComponent;
  public abstract title: string;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.sidebar = new SidebarComponent(page);
  }
}
