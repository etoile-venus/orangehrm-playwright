import { expect } from '@playwright/test';
import { testPageFactory as test } from 'pom/common/fixtures/page-factory.fixture';

test('', async ({ loginPage, dashboardPage, page }) => {
  await loginPage.navigateTo();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(dashboardPage.getFullUrl);
  await expect(dashboardPage.header.pageHeader).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
