import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  static path = process.env.SEARCH_URL;

  readonly postcodeInput: Locator;

  readonly findButton: Locator;

  constructor(page: Page) {
    super(page);
    this.postcodeInput = page.locator('input[name="postcode"]');
    this.findButton = page.locator('button:has-text("Find")');
  }

  async goto(): Promise<void> {
    await this.page.goto(HomePage.path);
  }

  async enterPostcode(postcode: string): Promise<void> {
    await this.postcodeInput.fill(postcode);
    await this.findButton.click();
  }
}

