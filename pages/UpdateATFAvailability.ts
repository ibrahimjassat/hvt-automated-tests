import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  static path = process.env.BASE_URL + 'confirm-mot-test-availability.service.gov.uk/update?token=' + process.env.TOKEN;

  readonly yesRadioButton: Locator;

  readonly noRadioButton: Locator;
  
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.yesRadioButton = page.locator('#hvt-');
    this.noRadioButton = page.locator('#hvt--2');
    this.continueButton = page.locator('button:has-text("Continue")');
  }

  async goto(): Promise<void> {
    await this.page.goto(HomePage.path);
  }

  async iHaveAvailability(): Promise<void> {
    await this.yesRadioButton.click();
    await this.continueButton.click();
  }

  async iDoNotHaveAvailability(): Promise<void> {
    await this.noRadioButton.click();
    await this.continueButton.click();
  }


  async gotoInvalidURL(): Promise<void> {
    await this.page.goto(HomePage.path.concat('hello'));
  }
}

