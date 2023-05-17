import { expect, test } from '@playwright/test';
import UpdateATFAvailability from '../pages/UpdateATFAvailability';
import { getValidToken, getExpiredToken, getInvalidToken } from '../data-providers/token.dataProvider';


test('Given a Operator wants to update their availability', async ( { page } ) => { 
  const updateATFAvailability = new UpdateATFAvailability(page);
  await updateATFAvailability.goto(getValidToken());
  await expect(updateATFAvailability.pageTitle.first()).toBeVisible();

  await test.step('When the operator update their availability to I have availability', async () => {
    await updateATFAvailability.iHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
    await expect(updateATFAvailability.availableSubmittedMessage.first()).toBeVisible();
  });

});

test('Given as Operator I do not have anymore test slots available', async ( { page } ) => { 
  const updateATFAvailability = new UpdateATFAvailability(page);
  const token = getValidToken();
  await updateATFAvailability.goto(token);

  await test.step('When the operator update their availability to I do not have availability', async () => {
    await expect(updateATFAvailability.pageTitle.first()).toBeVisible();
    await updateATFAvailability.iDoNotHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
    await expect(updateATFAvailability.fullyBookedSubmittedMessage.first()).toBeVisible();
    
  });
});

test('Given as Operator I do not have anymore test slots and uses the same link to update the availability', async ( { page } ) => { 
  const updateATFAvailability = new UpdateATFAvailability(page);
  const token = getValidToken();
  await updateATFAvailability.goto(token);

  await test.step('When the operator update their availability to I do not have availability', async () => {
    await expect(updateATFAvailability.pageTitle.first()).toBeVisible();
    await updateATFAvailability.iDoNotHaveAvailability();
  });

  await test.step('Then I should see a message', async () => {
    await expect(updateATFAvailability.fullyBookedSubmittedMessage.first()).toBeVisible();
    
  });

  await test.step('Then I have been notified of a cancellation', async () => {
    await updateATFAvailability.goto(token);
  
    await test.step('Then I update the availability to I have availability', async () => {
      await updateATFAvailability.iHaveAvailability();
    });
  
    await test.step('Then I should see a message', async () => {
      await expect(updateATFAvailability.availableSubmittedMessage.first()).toBeVisible();   
    });

  });

});

test('Given a Operator wants to update their availability but use an expired token', async ( { page } ) => { 
  const updateATFAvailability = new UpdateATFAvailability(page);
  const token = getExpiredToken();
  await updateATFAvailability.goto(token);

  await expect(updateATFAvailability.unableToUpdateAvailabilityMessage.first()).toBeVisible();
  await expect(updateATFAvailability.linkExpiryMessage.first()).toBeVisible();
  
});

test('Given a Operator wants to update their availability but use an invalid token', async ( { page } ) => { 
  const updateATFAvailability = new UpdateATFAvailability(page);
  const token = getInvalidToken();
  await updateATFAvailability.goto(token);

  await expect(updateATFAvailability.pageTitle.first()).toBeVisible();
  await expect(updateATFAvailability.invalidTokenErrorMessage.first()).toBeVisible();

});
