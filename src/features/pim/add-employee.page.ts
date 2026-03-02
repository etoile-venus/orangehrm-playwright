import { AppPage } from '@common/pages/app.page';
import { ROUTES } from '@common/routes';
import { Locator, Page } from '@playwright/test';

export class PimAddEmployeePage extends AppPage {
  public title = 'PIM';
  protected route = ROUTES.PIM.ADD_EMPLOYEE;

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([
      this.saveButton.waitFor({ state: 'visible' }),
      this.cancelButton.waitFor({ state: 'visible' }),
    ]);
  }
  // --------------------------------------------------------
  // Profile Picture
  // --------------------------------------------------------
  get profilePictureInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  // --------------------------------------------------------
  // Name Fields
  // --------------------------------------------------------
  get firstNameInput(): Locator {
    return this.page.getByPlaceholder('First Name');
  }
  get middleNameInput(): Locator {
    return this.page.getByPlaceholder('Middle Name');
  }
  get lastNameInput(): Locator {
    return this.page.getByPlaceholder('Last Name');
  }

  // --------------------------------------------------------
  // Employee ID (Requires structural filtering)
  // --------------------------------------------------------
  get employeeIdInput(): Locator {
    // Finds the wrapper div that contains the exact text 'Employee Id', then grabs the input inside
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Employee Id', { exact: true }),
      })
      .locator('input');
  }

  // --------------------------------------------------------
  // Login Details Section
  // --------------------------------------------------------
  get createLoginDetailsToggle(): Locator {
    // Error on the website, as the checkbox is not wrapped correctly, so we have to grab it manually
    // return this.page.getByRole('checkbox');
    return this.page.locator('.oxd-switch-wrapper');
  }
  get usernameInput(): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Username', { exact: true }),
      })
      .locator('input');
  }
  get usernameInputErrorMessage(): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Username', { exact: true }),
      })
      .locator('.oxd-input-field-error-message');
  }

  // Radio buttons in OrangeHRM are wrapped correctly, so getByRole works here!
  get statusEnabledRadio(): Locator {
    return this.page.getByRole('radio', { name: 'Enabled' });
  }
  get statusDisabledRadio(): Locator {
    return this.page.getByRole('radio', { name: 'Disabled' });
  }
  get passwordInput(): Locator {
    // exact: true is CRITICAL here, otherwise it will match 'Confirm Password' too
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Password', { exact: true }),
      })
      .locator('input');
  }
  get confirmPasswordInput(): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Confirm Password'),
      })
      .locator('input');
  }

  // --------------------------------------------------------
  // Form Actions
  // --------------------------------------------------------
  get saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }
  get cancelButton(): Locator {
    return this.page.getByRole('button', { name: 'Cancel' });
  }
  // --------------------------------------------------------
  async addEmployeeSuccessfully(
    firstname: string,
    middleName: string,
    lastName: string,
    username: string,
    password: string,
  ): Promise<number> {
    await Promise.all([
      this.firstNameInput.fill(firstname),
      this.middleNameInput.fill(middleName),
      this.lastNameInput.fill(lastName),
      this.createLoginDetailsToggle.click(),
      this.usernameInput.fill(username),
      this.passwordInput.fill(password),
      this.confirmPasswordInput.fill(password),
      this.saveButton.click(),
    ]);
    // await this.createLoginDetailsToggle.click();
    // await this.firstNameInput.fill(firstname);
    // await this.middleNameInput.fill(middleName);
    // await this.lastNameInput.fill(lastName);
    // await this.usernameInput.fill(username);
    // // ovo pravi problem await this.statusEnabledRadio.click();
    // await this.passwordInput.fill(password);
    // await this.confirmPasswordInput.fill(password);
    // await this.saveButton.click();

    const idString = await this.employeeIdInput.inputValue();
    console.log(Number(idString));
    return Number(idString);
  }
}
