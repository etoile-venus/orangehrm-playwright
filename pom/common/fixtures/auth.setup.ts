import { expect } from '@playwright/test';
import { testPageFactory } from './page-factory.fixture';
import { admin_user } from '@common/admin.credentials';

testPageFactory('Save admin user session', async ({ loginPage, dashboardPage, page }) => {
  await loginPage.navigateTo();
  await loginPage.login(admin_user.username, admin_user.password);
  await expect(page).toHaveURL(dashboardPage.getFullUrl);
  await expect(dashboardPage.header.pageHeader).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
