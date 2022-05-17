import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SearchResultsPage extends BasePage {
  static path = '/?postcode';

  readonly availabilityFilterRadioButton: Locator;
  
  readonly resultsNumber : Locator;

  constructor(page: Page) {
    super(page);
    this.availabilityFilterRadioButton = page.locator('#remove-no-availability-filter-radio-button');
    this.resultsNumber = page.locator('text=Showing 1 to 5 of 50 results');
  }

  async goto(postcode: string): Promise<void> {
    await this.page.goto(`${SearchResultsPage.path}=${postcode}`);
  }


  async showCentresWithTestsAvailable(): Promise<void> {
    await this.availabilityFilterRadioButton.check();
  }
  
}
