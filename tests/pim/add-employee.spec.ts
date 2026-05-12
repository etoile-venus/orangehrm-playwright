import { testAuth as test } from 'pom/common/fixtures/auth.fixture';
import { expect } from '@playwright/test';
import addEmployeeEPData from 'pom/features/pim/add-employee/data/add-employee.ep.json';
import addEmployeeValidData from 'pom/features/pim/add-employee/data/add-employee.valid.json';
import { Tags } from '@common/tags.constant';
import {
  AddEmployeeEPData,
  AddEmployeeValidData,
} from '@features/pim/add-employee/add-employee.types';

test.describe('PIM - Add Employee', () => {
  test.beforeEach(async ({ pimAddEmployeePage }) => {
    await pimAddEmployeePage.navigateTo();
  });

  for (const data of addEmployeeValidData as AddEmployeeValidData[]) {
    test(
      `Verify that Admin can add employee successfully - ${data.username}`,
      {
        tag: [Tags.FUNCTIONAL, Tags.REGRESSION],
      },
      async ({ pimAddEmployeePage, viewPersonalDetailsPage, page }) => {
        data.username = `${data.username}${Date.now()}`; // Append timestamp to ensure uniqueness

        await pimAddEmployeePage.addEmployeeSuccessfully(data);

        await expect(page).toHaveURL(/viewPersonalDetails/);
        await expect(viewPersonalDetailsPage.firstNameInput).toHaveValue(data.firstName);
        await expect(viewPersonalDetailsPage.lastNameInput).toHaveValue(data.lastName);
      },
    );
  }

  for (const data of addEmployeeEPData as AddEmployeeEPData[]) {
    test(
      `Verify username equivalence partitioning is valid - ${data.expectedMessage}`,
      {
        tag: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.EP],
      },
      async ({ pimAddEmployeePage }) => {
        await pimAddEmployeePage.createLoginDetailsToggle.click();
        await pimAddEmployeePage.usernameInput.fill(data.username);

        if (data.expectedMessage) {
          await expect(
            pimAddEmployeePage.getSpecificErrorLocator(data.errorType, data.targetLabel),
          ).toHaveText(data.expectedMessage);
        } else {
          await expect(
            pimAddEmployeePage.getSpecificErrorLocator(data.errorType, data.targetLabel),
          ).toBeHidden();
        }
      },
    );
  }
  //ovde ostalo za Verify that an admin cannot create a new employee with an existing username
  for (const data of addEmployeeValidData as AddEmployeeValidData[]) {
    test(
      `Verify that an admin cannot create a new employee with an existing username`,
      {
        tag: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.NEGATIVE],
      },
      async ({ pimAddEmployeePage, viewPersonalDetailsPage, loginPage, page }) => {
        data.username = `${data.username}${Date.now()}`;

        await pimAddEmployeePage.addEmployeeSuccessfully(data);

        await expect(page).toHaveURL(/viewPersonalDetails/);
        await expect(viewPersonalDetailsPage.firstNameInput).toHaveValue(data.firstName);
        await expect(viewPersonalDetailsPage.lastNameInput).toHaveValue(data.lastName);

        await pimAddEmployeePage.navigateTo();
        await pimAddEmployeePage.createLoginDetailsToggle.click();
        await pimAddEmployeePage.usernameInput.fill(data.username);

        await expect(pimAddEmployeePage.getSpecificErrorLocator('field', 'Username')).toHaveText(
          'Username already exists',
        );
      },
    );
  }
});
