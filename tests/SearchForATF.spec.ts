import { expect, test } from '@playwright/test';
import HomePage from '../pages/SearchATF';
import SearchResultsPage from '../pages/SearchATFResultsPage';

test('Given a Operator wants to find the closest approved Approved Testing Facility is', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When I enter postcode on the page', async () => {
    await homePage.enterPostcode('SW1A2AA');
  });
  
  await test.step('Then I should be on the results page', async () => {
    await expect(page.locator('text=Test centres near \'SW1A 2AA\'').first()).toBeVisible();
  });

});

test('Given a Operator wants to find where they are available test slots', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When I enter postcode on the page', async () => {
    await homePage.enterPostcode('SW1A2AA');
  });

  
  //Scenario: User decides to remove test centres with no availability from the results
  await test.step('I remove test centres with no availability from the results', async () => {
    
    const resultsPage = new SearchResultsPage(page);
    await expect(resultsPage.resultsNumber.first()).toBeVisible();
    await resultsPage.showCentresWithTestsAvailable(); 
    //this need a better assertion check this is not the best - 
    //might have to use the class and see if the class returns either availability or no information
    await expect(page.locator('text=Availability').first()).toBeVisible();
  });

  await test.step('When I enter invalid postcode on the page', async () => {
    await page.locator('#back-link').click();
    
    await homePage.enterPostcode('ABC123');
    await expect(page.locator('text=There is a problem Enter a postcode, like SW1A 2AA').first()).toBeVisible();
  });
});

test('Given a Operator enters an incorrect postcode', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When I enter invalid postcode on the page', async () => {
    await page.locator('#back-link').click();
    
    await homePage.enterPostcode('ABC123');
    await expect(page.locator('text=There is a problem Enter a postcode, like SW1A 2AA').first()).toBeVisible();
  });
});
