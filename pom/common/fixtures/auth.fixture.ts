import { testPageFactory } from './page-factory.fixture';

export const testAuth = testPageFactory.extend({
  storageState: 'playwright/.auth/user.json',
});
