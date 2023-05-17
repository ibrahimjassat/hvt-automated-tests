import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class AccessibilityPage extends BasePage {
  static path = process.env.SEARCH_URL;

  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('text=Accessibility for Book a lorry, bus or trailer annual test (MOT)');
  }

  async goto(): Promise<void> {
    await this.page.goto(AccessibilityPage.path);
  }

}
