import { expect, test } from '@playwright/test';
import Cookies from '../pages/Cookies';
import SearchATFPage from '../pages/SearchATFPage';

test('Given the user navigates to the site and the banner is displayed', async ( { page } ) => { 

  const searchATFpage = new SearchATFPage(page);
  await searchATFpage.goto();
  
  await test.step('Then I am presented with the banner', async () => {
    const cookieBanner = new Cookies(page);
    await expect(cookieBanner.cookieBannerTitle.first()).toBeVisible();
  });

});

test('Given User want to review the cookie policy on Find a test centre for an HGV, bus or trailer MOT', async ( { page } ) => { 

  const searchATFPage = new SearchATFPage(page);
  await searchATFPage.goto();
  
  await test.step('when I click the cookie link', async () => {
    await searchATFPage.cookiesPageLink.click();
  });

  await test.step('Then I am on the cookie policy page', async () => {
    const cookie = new Cookies(page);
    await expect(cookie.cookiePageTitle.first()).toBeVisible();

  });
  
});

test('Given a user wants to accept the cookies on the site', async ( { page } ) => { 
  const searchATFPage = new SearchATFPage(page);
  await searchATFPage.goto();

  const cookie = new Cookies(page);
  await test.step('When I am presented with the banner, I click accept', async () => {
    await expect(cookie.cookieBannerTitle.first()).toBeVisible();
    await cookie.acceptCookies();
  });

  await test.step('Then I check if the cookies are set', async () => {
    await expect(cookie.acceptedCookiesMessage.first()).toBeVisible();
  });

  await test.step('Then I hide the banner', async () => {
    await cookie.hideBanner();
  });
  
});

test('Given a user wants to sets cookie preference', async ( { page } ) => { 
  const searchATFPage = new SearchATFPage(page);
  await searchATFPage.goto();

  const cookie = new Cookies(page);
  await test.step('When I am presented with the banner, I want to set cookie preference', async () => {
    await expect(cookie.cookieBannerTitle.first()).toBeVisible();
    await cookie.setCookiePreference();
  });
  
  await test.step('Then I set analytics to on', async () => {
    await expect(page).toHaveURL(process.env.SEARCH_URL + 'cookie-preferences');
    await cookie.setAnalyticsToOn();
    await expect(cookie.cookieChangeSuccessMessage.first()).toBeVisible();
  });
    
});

test('Given a user wants to accept the cookies on the site but then decides to change their analytics preference', async ( { page } ) => { 
  const searchATFPage = new SearchATFPage(page);
  await searchATFPage.goto();

  const cookie = new Cookies(page);
  
  await test.step('When I am presented with the banner, I click accept', async () => {
    await expect(cookie.cookieBannerTitle.first()).toBeVisible();
    await cookie.acceptCookies();
  });
  
  await test.step('Then I hide the banner', async () => {
    await expect(cookie.acceptedCookiesMessage.first()).toBeVisible();
    await cookie.hideBanner();
  });

  await test.step('Then I click the cookies link and navigate to the preference page', async () => {
    await searchATFPage.cookiesPageLink.click();
    await cookie.cookiePreferencePage.click();
    await expect(page).toHaveURL(process.env.SEARCH_URL + 'cookie-preferences');
  });

  await test.step('Then I set analytics to off', async () => {
    await cookie.setAnalyticsToOff();
    await expect(cookie.cookieChangeSuccessMessage.first()).toBeVisible();
  });

});
