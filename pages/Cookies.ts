import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  static path = process.env.SEARCH_URL;

  readonly acceptCookiesButton: Locator;

  readonly setCookiePreferenceButton: Locator;

  readonly hideLink: Locator;

  readonly cookiesPageLink: Locator;

  readonly setAnalyticsToOnRadioButton: Locator;

  readonly setAnalyticsToOffRadioButton: Locator;

  readonly saveChangeButton: Locator;

  readonly cookiePreferencePage: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptCookiesButton = page.locator('text=Accept all cookies');
    this.setCookiePreferenceButton = page.locator('text=Set cookie preferences');
    this.hideLink = page.locator('text=Hide');
    this.setAnalyticsToOnRadioButton = page.locator('#radio-analytics-on');
    this.setAnalyticsToOffRadioButton = page.locator('#radio-analytics-off');
    this.saveChangeButton = page.locator('text=Save changes');
    this.cookiesPageLink = page.locator('a:has-text("Cookies")');
    this.cookiePreferencePage = page.locator('text=change which cookies you\'re happy for us to use.');
  }

  async goto(): Promise<void> {
    await this.page.goto(HomePage.path);
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

  async cookiesPreferencePage(): Promise<void> {
    await this.cookiesPageLink.click();
    await this.cookiePreferencePage.click();
  }

}
