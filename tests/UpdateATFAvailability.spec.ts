import { expect, test } from '@playwright/test';
import HomePage from '../pages/UpdateATFAvailability';


test('Given a Operator wants to update their availability', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When the operator update their availability to I have availability', async () => {
    await homePage.iHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
      await expect(page.locator('text=can take more MOT bookings').first()).toBeVisible();
    
  });

});

test('Given as Operator I do not have anymore test slots', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When the operator update their availability to I do not have availability', async () => {
    await homePage.iDoNotHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
      await expect(page.locator('text=is fully booked').first()).toBeVisible();
    
  });

});