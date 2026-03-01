import { AppPage } from '@common/pages/app.page';
import { ROUTES } from '@common/routes';
import { Page } from '@playwright/test';

export class DashboardPage extends AppPage {
  protected route = ROUTES.DASHBOARD;
  public title = 'Dashboard';

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoad(): Promise<void> {
    await Promise.all([]);
  }
}
