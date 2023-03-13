import { expect, test } from '@playwright/test';
import HomePage from '../pages/Cookies';

test('Given a user wants to accept the cookies on the site', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When I am presented with the banner, I click accept', async () => {
    await expect(page.locator('text=Cookies on Find a test centre for an HGV, bus or trailer MOT').first()).toBeVisible();
    await homePage.acceptCookies();
  });

  await test.step('Then I hide the banner', async () => {
    await expect(page.locator('text=You’ve accepted all cookies. You can change your cookie settings at any time.').first()).toBeVisible();
    await homePage.hideBanner();
  });
  
});

test('Given a user wants to sets cookie preference', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();
  
  await test.step('When I am presented with the banner, I want to set cookie preference', async () => {
    await expect(page.locator('text=Cookies on Find a test centre for an HGV, bus or trailer MOT').first()).toBeVisible();
    await homePage.setCookiePreference();
  });
  
  await test.step('Then I set analytics to on', async () => {
    await expect(page).toHaveURL(process.env.SEARCH_URL + 'cookie-preferences');
    await homePage.setAnalyticsToOn();
    await page.locator('text=Your cookie settings were saved').click();
  });
    
});

test('Given a user wants to accept the cookies on the site but then decides to change their analytics preference', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();
  
  await test.step('When I am presented with the banner, I click accept', async () => {
    await expect(page.locator('text=Cookies on Find a test centre for an HGV, bus or trailer MOT').first()).toBeVisible();
    await homePage.acceptCookies();
  });
  
  await test.step('Then I hide the banner', async () => {
    await expect(page.locator('text=You’ve accepted all cookies. You can change your cookie settings at any time.').first()).toBeVisible();
    await homePage.hideBanner();
  });

  await test.step('Then I click the cookies link and navigate to the preference page', async () => {
    await homePage.cookiesPreferencePage();
    await expect(page).toHaveURL(process.env.SEARCH_URL + 'cookie-preferences');
  });

  await test.step('Then I set analytics to off', async () => {
    await homePage.setAnalyticsToOff();
    await page.locator('text=Your cookie settings were saved').click();
  });

});
