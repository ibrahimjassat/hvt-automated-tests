import { Page } from '@playwright/test';

abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract goto(...params: string[]): Promise<void>;
}

export default BasePage;
