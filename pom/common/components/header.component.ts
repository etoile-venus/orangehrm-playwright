import { Page } from '@playwright/test';

export class HeaderComponent {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pageHeader() {
    return this.page.getByRole('heading', { level: 6 });
    //return this.page.locator('.oxd-topbar-header');
  }

  get userDropdownTrigger() {
    //return this.page.getByAltText('profile picture');
    return this.page.locator('.oxd-userdropdown-img');
  }
  get aboutMenuItem() {
    return this.page.getByRole('menuitem', { name: 'About' });
  }
  get supportMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Support' });
  }
  get changePasswordMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Change Password' });
  }
  get logoutMenuItem() {
    return this.page.getByRole('menuitem', { name: 'Logout' });
  }

  //
  get userDropdownName() {
    return this.page.locator('.oxd-userdropdown-name');
  }

  async openUserMenu() {
    await this.userDropdownTrigger.click();
  }
  async logout() {
    await this.openUserMenu();
    await this.logoutMenuItem.click();
  }

  async changePassword() {
    await this.openUserMenu();
    await this.changePasswordMenuItem.click();
  }
}
