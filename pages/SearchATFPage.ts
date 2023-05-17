import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SearchATFPage extends BasePage {
  static path = process.env.SEARCH_URL;

  readonly postcodeInput: Locator;

  readonly findButton: Locator;

  readonly accessibilityLink: Locator;

  readonly privacyLink: Locator;

  readonly cookiesPageLink: Locator;

  readonly invalidPostcodeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.postcodeInput = page.locator('input[name="postcode"]');
    this.findButton = page.locator('button:has-text("Find")');
    this.accessibilityLink = page.locator('text=Accessibility');
    this.privacyLink = page.locator('text=Privacy');
    this.cookiesPageLink = page.locator('a:has-text("Cookies")');
    this.invalidPostcodeMessage = page.locator('text=There is a problem Enter a postcode, like SW1A 2AA');
  }

  async goto(): Promise<void> {
    await this.page.goto(SearchATFPage.path);
  }

  async enterPostcode(postcode: string): Promise<void> {
    await this.postcodeInput.fill(postcode);
    await this.findButton.click();
  }
}

