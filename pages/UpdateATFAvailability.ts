import { Locator, Page } from '@playwright/test';
import { get, getAll } from '../service/dynamodb.service';
import BasePage from './BasePage';

export default class HomePage extends BasePage {

  readonly yesRadioButton: Locator;

  readonly noRadioButton: Locator;
  
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.yesRadioButton = page.locator('#hvt-');
    this.noRadioButton = page.locator('#hvt--2');
    this.continueButton = page.locator('button:has-text("Continue")');
  }

async createURL(): Promise<string> {
  const url = new URL('/update', process.env.CONFIRM_URL);
  const getRows = await getAll(process.env.DB_TABLE_NAME,1);

  if (getRows.Count === 0) {
    throw new Error ("Table did not return rows")
  } 

  const token = getRows.Items[0].token as string;

  const addSearchParams = (url: URL, params : {[key : string]:string}) =>
  new URL(
    `${url.origin}${url.pathname}?${new URLSearchParams([
      ...Array.from(url.searchParams.entries()),
      ...Object.entries(params),
    ]).toString()}`
  );

  return addSearchParams(url,{token}).toString();
  
}
  async goto(): Promise<void> {
    await this.page.goto(await this.createURL());
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

  async gotoExpiredURL(): Promise<void> {
    await this.page.goto(HomePage.path + process.env.EXPIREDTOKEN);
  }
}

