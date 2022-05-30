import { expect, test } from '@playwright/test';
import HomePage from '../pages/UpdateATFAvailability';


test('Given a Operator wants to update their availability', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page.locator('text=Tell DVSA if you could take more MOT bookings').first()).toBeVisible();

  await test.step('When the operator update their availability to I have availability', async () => {
    await homePage.iHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
    await expect(page.locator('text=can take more MOT bookings').first()).toBeVisible();
  });

});

test('Given as Operator I do not have anymore test slots and uses the same link to update the availability', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();

  await test.step('When the operator update their availability to I do not have availability', async () => {
    await homePage.iDoNotHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
    await expect(page.locator('text=is fully booked').first()).toBeVisible();
    
  });

  await test.step('Then I have been notified of a cancellation', async () => {
    await homePage.goto();
  
    await test.step('Then I update the availability to I have availability', async () => {
      await homePage.iHaveAvailability();
    });
  
    await test.step('Then I should see a message', async () => {
      await expect(page.locator('text=can take more MOT bookings').first()).toBeVisible();   
    });

  });

});

test('Given a Operator wants to update their availability but uses an expired token', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page.locator('text=Tell DVSA if you could take more MOT bookings').first()).toBeVisible();
    await expect(page.locator('text=The link you used has expired').first()).toBeVisible();

});

test('Given a Operator wants to update their availability but use an invaild token', async ( { page } ) => { 
  const homePage = new HomePage(page);
  await homePage.gotoInvalidURL();
  await expect(page.locator('text=Tell DVSA if you could take more MOT bookings').first()).toBeVisible();
  await expect(page.locator('text=Sorry, there is a problem with the service').first()).toBeVisible();
});
