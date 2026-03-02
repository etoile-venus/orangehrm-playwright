import { LoginPage } from 'pom/features/login/login.page';
import { testPageFactory as test } from 'pom/common/fixtures/page-factory.fixture';
import { expect } from '@playwright/test';
import { AUTH_TC01, AUTH_TC02, AUTH_TC03, AUTH_TC04 } from 'pom/features/login/login.data';
import { testDetails, testTitle } from 'pom/common/test-case.model';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
  });

  test(
    testTitle(AUTH_TC01.id, AUTH_TC01.title),
    testDetails(AUTH_TC01.tags, AUTH_TC01.description),
    async ({ loginPage, dashboardPage, page }) => {
      const data = AUTH_TC01.data;

      await loginPage.login(data.username, data.password);
      await expect(page).toHaveURL(dashboardPage.getFullUrl);
      await expect(dashboardPage.header.pageHeader).toHaveText(dashboardPage.title);

      await dashboardPage.header.openUserMenu();
      await expect(dashboardPage.header.logoutMenuItem).toBeVisible();
    },
  );

  test(
    testTitle(AUTH_TC02.id, AUTH_TC02.title),
    testDetails(AUTH_TC02.tags, AUTH_TC02.description),
    async ({ loginPage, page }) => {
      const data = AUTH_TC02.data;

      await loginPage.login(data.username, data.password);

      await expect(page).toHaveURL(loginPage.getFullUrl);
      await expect(loginPage.passwordRequiredMessage).toBeVisible();
      await expect(loginPage.passwordRequiredMessage).toHaveText(data.passwordErrorMessage);
    },
  );

  test(
    testTitle(AUTH_TC03.id, AUTH_TC03.title),
    testDetails(AUTH_TC03.tags, AUTH_TC03.description),
    async ({ loginPage, page }) => {
      const data = AUTH_TC03.data;

      await loginPage.login(data.username, data.password);

      await expect(page).toHaveURL(loginPage.getFullUrl);
      await expect(loginPage.alertMessage).toBeVisible();
      await expect(loginPage.alertMessage).toHaveText(data.invalidCredentialsMessage);
    },
  );

  test(
    testTitle(AUTH_TC04.id, AUTH_TC04.title),
    testDetails(AUTH_TC04.tags, AUTH_TC04.description),
    async ({ loginPage, page }) => {
      const data = AUTH_TC04.data;

      await loginPage.login(data.username, data.password);

      await expect(page).toHaveURL(loginPage.getFullUrl);
      await expect(loginPage.usernameRequiredMessage).toBeVisible();
      await expect(loginPage.usernameRequiredMessage).toHaveText(data.usernameErrorMessage);
    },
  );
});
