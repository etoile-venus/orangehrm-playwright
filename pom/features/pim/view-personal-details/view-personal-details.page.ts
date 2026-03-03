import { AppPage } from '@common/pages/app.page';
import { ROUTES } from '@common/routes';
import { Locator, Page } from '@playwright/test';

export class ViewPersonalDetailsPage extends AppPage {
  public title: string = 'PIM';
  protected route = ROUTES.PIM.VIEW_PERSONAL_DETAILS;

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([this.saveButton.waitFor({ state: 'visible' })]);
  }

  get saveButton(): Locator {
    return this.page.getByRole('button', { name: ' Save ' });
  }

  constructor(page: Page) {
    super(page);
  }

  get firstNameInput(): Locator {
    return this.getFieldWrapperByText('Employee Full Name').locator('input[name="firstName"]');
  }

  get lastNameInput(): Locator {
    return this.getFieldWrapperByText('Employee Full Name').locator('input[name="lastName"]');
  }
}
