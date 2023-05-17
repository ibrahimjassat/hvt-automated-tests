import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class UpdateATFAvailability extends BasePage {
  static path = process.env.CONFIRM_URL;

  readonly pageTitle: Locator;

  readonly yesRadioButton: Locator;

  readonly noRadioButton: Locator;
  
  readonly continueButton: Locator;

  readonly availableSubmittedMessage: Locator;

  readonly fullyBookedSubmittedMessage: Locator;

  readonly invalidTokenErrorMessage: Locator;

  readonly linkExpiryMessage: Locator;
  
  readonly unableToUpdateAvailabilityMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('text=Tell DVSA if you could take more MOT bookings');
    this.yesRadioButton = page.locator('#hvt-');
    this.noRadioButton = page.locator('#hvt--2');
    this.continueButton = page.locator('button:has-text("Continue")');
    this.availableSubmittedMessage = page.locator('text=can take more MOT bookings');
    this.fullyBookedSubmittedMessage = page.locator('text=is fully booked');
    this.invalidTokenErrorMessage = page.locator('text=Sorry, there is a problem with the service');
    this.linkExpiryMessage = page.locator('text=The link you used has expired.');
    this.unableToUpdateAvailabilityMessage = page.locator('text=Sorry, we cannot update your availability');
  }

  async goto(token: string): Promise<void> {
    await this.page.goto(UpdateATFAvailability.path + (token));
  }

  async iHaveAvailability(): Promise<void> {
    await this.yesRadioButton.click();
    await this.continueButton.click();
  }

  async iDoNotHaveAvailability(): Promise<void> {
    await this.noRadioButton.click();
    await this.continueButton.click();
  }

}
