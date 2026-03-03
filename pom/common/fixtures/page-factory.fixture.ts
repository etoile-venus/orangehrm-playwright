import { DashboardPage } from 'pom/features/dashboard/dashboard.page';
import { LoginPage } from 'pom/features/login/login.page';
import { PimAddEmployeePage } from '@features/pim/add-employee/add-employee.page';
import test from '@playwright/test';
import { ViewPersonalDetailsPage } from '@features/pim/view-personal-details/view-personal-details.page';

type PageFactoryFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimAddEmployeePage: PimAddEmployeePage;
  viewPersonalDetailsPage: ViewPersonalDetailsPage;
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
  viewPersonalDetailsPage: async ({ page }, use) => {
    await use(new ViewPersonalDetailsPage(page));
  },
});
