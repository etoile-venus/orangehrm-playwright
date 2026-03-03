import { testPageFactory as test } from 'pom/common/fixtures/page-factory.fixture';
import { expect } from '@playwright/test';
import invalidLoginData from 'pom/features/login/data/login.invalid.json';
import validLoginData from 'pom/features/login/data/login.valid.json';
import { LoginInvalidData, LoginValidData } from '@features/login/login.types';
import { Tags } from '@common/tags.constant';
import { admin_user } from '@common/admin.credentials';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
  });

  test(
    'Verify that admin user can login successfully',
    {
      tag: [Tags.FUNCTIONAL, Tags.SMOKE, '@SYSTEM_USER'],
    },
    async ({ loginPage, dashboardPage, page }) => {
      await loginPage.login(admin_user.username, admin_user.password);

      await expect(page).toHaveURL(dashboardPage.getFullUrl);
      await expect(dashboardPage.header.pageHeader).toHaveText(dashboardPage.title);

      await dashboardPage.header.openUserMenu();
      await expect(dashboardPage.header.logoutMenuItem).toBeVisible();
    },
  );

  for (const data of validLoginData as LoginValidData[]) {
    test(
      `Verify that the user is successfully logged in when valid credentials are provided - ${data.username}`,
      {
        tag: [Tags.FUNCTIONAL, Tags.SMOKE],
      },
      async ({ loginPage, dashboardPage, page }) => {
        await loginPage.login(data.username, data.password);

        await expect(page).toHaveURL(dashboardPage.getFullUrl);
        await expect(dashboardPage.header.pageHeader).toHaveText(dashboardPage.title);

        await dashboardPage.header.openUserMenu();
        await expect(dashboardPage.header.logoutMenuItem).toBeVisible();
      },
    );
  }

  for (const data of invalidLoginData as LoginInvalidData[]) {
    test(
      `Verify that the user cannot login with invalid credentials - ${data.username} / ${data.password}`,
      {
        tag: [Tags.FUNCTIONAL, Tags.NEGATIVE, Tags.REGRESSION],
      },
      async ({ loginPage, page }) => {
        await loginPage.login(data.username, data.password);

        await expect(page).toHaveURL(loginPage.getFullUrl);
        await expect(
          loginPage.getSpecificErrorLocator(data.errorType, data.targetLabel),
        ).toHaveText(data.expectedMessage);
      },
    );
  }
});
