import { Locator, Page } from '@playwright/test';

export class SidebarComponent {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get searchInput(): Locator {
    return this.page.getByPlaceholder('Search');
  }

  get toggleSidebarButton(): Locator {
    return this.page.locator('.oxd-main-menu-button');
  }

  getMenuItem(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  async searchMenu(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async collapseOrExpandSidebar() {
    await this.toggleSidebarButton.click();
  }

  async navigateTo(menuName: SidebarItem) {
    await this.getMenuItem(menuName).click();
  }
}

export enum SidebarItem {
  ADMIN = 'Admin',
  PIM = 'PIM',
  LEAVE = 'Leave',
  TIME = 'Time',
  RECRUITMENT = 'Recruitment',
  MY_INFO = 'My Info',
  PERFORMANCE = 'Performance',
  DASHBOARD = 'Dashboard',
  DIRECTORY = 'Directory',
  MAINTENANCE = 'Maintenance',
  CLAIM = 'Claim',
  BUZZ = 'Buzz',
}
