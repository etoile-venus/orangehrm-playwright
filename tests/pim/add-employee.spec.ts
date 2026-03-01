import { testAuth as test } from '@common/fixtures/auth.fixture';
import { testDetails, testTitle } from '@common/test-case.model';
import { PIM_ADD_EMPLOYEE_EP } from '@features/pim/add-employee.data';
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
});
