import { DashboardPage } from 'pom/features/dashboard/dashboard.page';
import { LoginPage } from 'pom/features/login/login.page';
import { PimAddEmployeePage } from 'pom/features/pim/add-employee.page';
import test from '@playwright/test';

type PageFactoryFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimAddEmployeePage: PimAddEmployeePage;
};

export const testPageFactory = test.extend<PageFactoryFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimAddEmployeePage: async ({ page }, use) => {
    await use(new PimAddEmployeePage(page));
  },
});
