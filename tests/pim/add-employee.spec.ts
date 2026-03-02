import { testAuth as test } from 'pom/common/fixtures/auth.fixture';
import { testDetails, testTitle } from 'pom/common/test-case.model';
import { PIM_ADD_EMPLOYEE_EP, PIM_TC05, PIM_TC06 } from 'pom/features/pim/add-employee.data';
import { expect } from '@playwright/test';
test.describe('PIM - Add Employee', () => {
  test.beforeEach(async ({ pimAddEmployeePage }) => {
    await pimAddEmployeePage.navigateTo();
  });

  test('TEST', async ({ pimAddEmployeePage, page }) => {
    await expect(page).toHaveURL(pimAddEmployeePage.getFullUrl);
  });

  for (const testCase of PIM_ADD_EMPLOYEE_EP) {
    test(
      testTitle(testCase.id, testCase.title),
      testDetails(testCase.tags, testCase.description),
      async ({ pimAddEmployeePage }) => {
        const data = testCase.data;

        await pimAddEmployeePage.createLoginDetailsToggle.click();
        await pimAddEmployeePage.usernameInput.fill(data.username);

        if (data.usernameErrorMessage) {
          await expect(pimAddEmployeePage.usernameInputErrorMessage).toBeVisible();
          await expect(pimAddEmployeePage.usernameInputErrorMessage).toHaveText(
            data.usernameErrorMessage,
          );
        } else {
          await expect(pimAddEmployeePage.usernameInputErrorMessage).toBeHidden();
        }
      },
    );
  }

  test(
    testTitle(PIM_TC06.id, PIM_TC06.title),
    testDetails(PIM_TC06.tags, PIM_TC06.description),
    async ({ pimAddEmployeePage }) => {
      const data = PIM_TC06.data;
      // await pimAddEmployeePage.addEmployeeSuccessfully(
      //   PIM_TC06.data.firstname,
      //   PIM_TC06.data.middleName,
      //   PIM_TC06.data.lastName,
      //   PIM_TC06.data.username,
      //   PIM_TC06.data.password,
      //ovo nece da radi, ne upisuje u dobra polja iz nekog razloga
      // );
      await pimAddEmployeePage.createLoginDetailsToggle.click();
      await pimAddEmployeePage.firstNameInput.fill(PIM_TC06.data.firstname);
      await pimAddEmployeePage.middleNameInput.fill(PIM_TC06.data.middleName);
      await pimAddEmployeePage.lastNameInput.fill(PIM_TC06.data.lastName);
      await pimAddEmployeePage.usernameInput.fill(PIM_TC06.data.username);
      // ovo pravi problem await this.statusEnabledRadio.click();
      await pimAddEmployeePage.passwordInput.fill(PIM_TC06.data.password);
      await pimAddEmployeePage.confirmPasswordInput.fill(PIM_TC06.data.password);
      await pimAddEmployeePage.saveButton.click();

      //sad asertacije ovde da se ubace da se proveri da li su stvarno podaci upisani kako treba kad te redirektuje na viewPersonalDetails page
      //ukljucujuci id
    },
  );

  test(
    testTitle(PIM_TC05.id, PIM_TC05.title),
    testDetails(PIM_TC05.tags, PIM_TC05.description),
    async ({ pimAddEmployeePage, page }) => {
      const data = PIM_TC05.data;
      // await pimAddEmployeePage.addEmployeeSuccessfully(
      //   PIM_TC06.data.firstname,
      //   PIM_TC06.data.middleName,
      //   PIM_TC06.data.lastName,
      //   PIM_TC06.data.username,
      //   PIM_TC06.data.password,
      //ovo nece da radi, ne upisuje u dobra polja iz nekog razloga
      // );
      await pimAddEmployeePage.createLoginDetailsToggle.click();
      await pimAddEmployeePage.firstNameInput.fill(PIM_TC05.data.firstname);
      await pimAddEmployeePage.middleNameInput.fill(PIM_TC05.data.middleName);
      await pimAddEmployeePage.lastNameInput.fill(PIM_TC05.data.lastName);
      await pimAddEmployeePage.usernameInput.fill(PIM_TC05.data.username);
      // ovo pravi problem await this.statusEnabledRadio.click();
      await pimAddEmployeePage.passwordInput.fill(PIM_TC05.data.password);
      await pimAddEmployeePage.confirmPasswordInput.fill(PIM_TC05.data.password);
      await pimAddEmployeePage.saveButton.click();

      await pimAddEmployeePage.navigateTo();
      await pimAddEmployeePage.createLoginDetailsToggle.click();
      await pimAddEmployeePage.usernameInput.fill(PIM_TC05.data.username);
      expect(pimAddEmployeePage.usernameInputErrorMessage).toBe('Username already exists');
      await pimAddEmployeePage.saveButton.click();
      await expect(page).toHaveURL(pimAddEmployeePage.getFullUrl);
    },
  );
});
