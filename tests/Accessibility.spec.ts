import { expect, test } from '@playwright/test';
import SearchATFPage from '../pages/SearchATFPage';
import AccessibilityPage from '../pages/AccessibilityPage';

test('Given the user navigates to the accessibility page to see any outstanding @accessibility @regression @release', async ( { page } ) => { 

  const searchATFPage = new SearchATFPage(page);
  await searchATFPage.goto();
  
  await test.step('Then I click on the accessibility link in the footer', async () => {
    await searchATFPage.accessibilityLink.click();
  });

  await test.step('And I check I am on the accessibility page', async () => {
    const accessibilityPage = new AccessibilityPage(page);
    await expect(accessibilityPage.pageTitle.first()).toBeVisible();
  });

});
