import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class Cookies extends BasePage {
  static path = process.env.SEARCH_URL;

  readonly cookieBannerTitle: Locator;

  readonly acceptCookiesButton: Locator;

  readonly setCookiePreferenceButton: Locator;

  readonly hideLink: Locator;

  readonly setAnalyticsToOnRadioButton: Locator;

  readonly setAnalyticsToOffRadioButton: Locator;

  readonly saveChangeButton: Locator;

  readonly cookiePreferencePage: Locator;

  readonly cookiePageTitle: Locator;

  readonly acceptedCookiesMessage: Locator;

  readonly cookieChangeSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cookieBannerTitle = page.locator('[aria-label="Cookies on Find a test centre for an HGV\\, bus or trailer MOT"]');
    this.acceptCookiesButton = page.locator('text=Accept all cookies');
    this.setCookiePreferenceButton = page.locator('text=Set cookie preferences');
    this.acceptedCookiesMessage = page.locator('text=You’ve accepted all cookies. You can change your cookie settings at any time.');
    this.hideLink = page.locator('text=Hide');
    this.setAnalyticsToOnRadioButton = page.locator('#radio-analytics-on');
    this.setAnalyticsToOffRadioButton = page.locator('#radio-analytics-off');
    this.saveChangeButton = page.locator('text=Save changes');
    this.cookiePreferencePage = page.locator('text=change which cookies you\'re happy for us to use.');
    this.cookiePageTitle = page.locator('h2:has-text("Cookies")').nth(1);
    this.cookieChangeSuccessMessage = page.locator('text=Your cookie settings were saved');
  }

  async goto(): Promise<void> {
    await this.page.goto(Cookies.path);
  }

  async acceptCookies(): Promise<void> {
    await this.acceptCookiesButton.click();
  }

  async setCookiePreference(): Promise<void> {
    await this.setCookiePreferenceButton.click();
  }

  async hideBanner(): Promise<void> {
    await this.hideLink.click();
  }

  async setAnalyticsToOn(): Promise<void> {
    await this.setAnalyticsToOnRadioButton.check();
    await this.saveChangeButton.click();
  }

  async setAnalyticsToOff(): Promise<void> {
    await this.setAnalyticsToOffRadioButton.check();
    await this.saveChangeButton.click();
  }

}
