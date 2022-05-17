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

test('Given a user wants to sets cookie perference', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();
  
  await test.step('When I am presented with the banner, I want to set cookie pereference', async () => {
    await expect(page.locator('text=Cookies on Find a test centre for an HGV, bus or trailer MOT').first()).toBeVisible();
    await homePage.setCookiePerference();
  });
  
  await test.step('Then I set analytics to on', async () => {
    await expect(page).toHaveURL('https://int.find-test-centre-hgv-bus-trailer-mot.service.gov.uk/cookie-preferences');
    await homePage.setAnalyticsToOn();
    await page.locator('text=Your cookie settings were saved').click();
  });
    
});

test('Given a user wants to accept the cookies on the site but then decides to change their analytics perference', async ( { page } ) => { 
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

  await test.step('Then I click the cookies link and navigate to the perference page', async () => {
    await homePage.cookiesPerferencePage();
    await expect(page).toHaveURL('https://int.find-test-centre-hgv-bus-trailer-mot.service.gov.uk/cookie-preferences');
  });

  await test.step('Then I set analytics to off', async () => {
    await homePage.setAnalyticsToOff();
    await page.locator('text=Your cookie settings were saved').click();
  });

});
