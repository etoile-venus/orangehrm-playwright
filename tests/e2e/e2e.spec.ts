import { testAuth as test } from 'pom/common/fixtures/auth.fixture';
import { expect } from '@playwright/test';
import addEmployeeEPData from 'pom/features/pim/add-employee/data/add-employee.ep.json';
import addEmployeeValidData from 'pom/features/pim/add-employee/data/add-employee.valid.json';
import { Tags } from '@common/tags.constant';
import {
  AddEmployeeEPData,
  AddEmployeeValidData,
} from '@features/pim/add-employee/add-employee.types';

test.describe('e2e', () => {
  test.beforeEach(async ({ pimAddEmployeePage }) => {
    await pimAddEmployeePage.navigateTo();
  });

  for (const data of addEmployeeValidData as AddEmployeeValidData[]) {
    test(
      `Verify that an admin can create a new employee who can successfully log in.`,
      {
        tag: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.E2E],
      },
      async ({ pimAddEmployeePage, viewPersonalDetailsPage, dashboardPage, loginPage, page }) => {
        data.username = `${data.username}${Date.now()}`; // Append timestamp to ensure uniqueness

        const employeeId: string = await pimAddEmployeePage.addEmployeeSuccessfully(data);

        await expect(page).toHaveURL(/viewPersonalDetails/);
        await expect(viewPersonalDetailsPage.firstNameInput).toHaveValue(data.firstName);
        await expect(viewPersonalDetailsPage.lastNameInput).toHaveValue(data.lastName);

        await viewPersonalDetailsPage.header.logout();

        await expect(page).toHaveURL(loginPage.getFullUrl);
        await expect(loginPage.loginButton).toBeVisible();

        await loginPage.login(data.username, data.password);

        await expect(page).toHaveURL(dashboardPage.getFullUrl);
        await expect(dashboardPage.header.pageHeader).toHaveText(dashboardPage.title);

        await dashboardPage.header.openUserMenu();
        await expect(dashboardPage.header.logoutMenuItem).toBeVisible();

        await expect(dashboardPage.header.userDropdownName).toContainText(data.firstName);
        await expect(dashboardPage.header.userDropdownName).toContainText(data.lastName);
      },
    );
  }

  for (const data of addEmployeeValidData as AddEmployeeValidData[]) {
    test(
      `Verify that an admin can create a new employee with a disabled account.`,
      {
        tag: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.E2E, Tags.NEGATIVE],
      },
      async ({ pimAddEmployeePage, viewPersonalDetailsPage, dashboardPage, loginPage, page }) => {
        data.username = `${data.username}${Date.now()}`; // Append timestamp to ensure uniqueness

        const employeeId: string = await pimAddEmployeePage.addDisabledEmployeeSuccessfully(data);

        await expect(page).toHaveURL(/viewPersonalDetails/);
        await expect(viewPersonalDetailsPage.firstNameInput).toHaveValue(data.firstName);
        await expect(viewPersonalDetailsPage.lastNameInput).toHaveValue(data.lastName);

        await viewPersonalDetailsPage.header.logout();

        await expect(page).toHaveURL(loginPage.getFullUrl);
        await expect(loginPage.loginButton).toBeVisible();

        await loginPage.login(data.username, data.password);
        await expect(page).toHaveURL(dashboardPage.getFullUrl);

        await loginPage.getSpecificErrorLocator('login-alert');
        await expect(loginPage.getSpecificErrorLocator('login-alert')).toHaveText(
          'Account disabled',
        );
      },
    );
  }
});
