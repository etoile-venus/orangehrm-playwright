import { DashboardPage } from '@features/dashboard/dashboard.page';
import { LoginPage } from '@features/login/login.page';
import test from '@playwright/test';

type PageFactoryFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  // cartPage: CartPage;
};

export const testPageFactory = test.extend<PageFactoryFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  // cartPage: async ({ page }, use) => {
  //   await use(new CartPage(page));
  // },
});
