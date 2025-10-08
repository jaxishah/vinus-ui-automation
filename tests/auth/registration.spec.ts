import { test, expect, Page } from '@playwright/test';
import { getRegistrationForm, openRegistrationPopup } from '../../helpers/registrationHelpers';

//import users from '../../test-data/users.json' assert { type: 'json' };
const BASE_URL = process.env.BASE_URL!;
test.describe.configure({ mode: 'serial' });


test.describe('Registration Form Tests (Main Menu)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    });

    //Test: Simple popup opens
    test('Open registration popup', async ({ page }) => {
        const registrationPopup = await openRegistrationPopup(page);
        await expect(registrationPopup).toBeVisible();
    });

   // // Test: All fields are visible
    test('All required registration fields should be visible', async ({ page }) => {
        const popup = await openRegistrationPopup(page);
        const form = await getRegistrationForm(page, popup);

        for (const key of Object.keys(form)) {
            const element = form[key];
            // if (await element.count() > 0) {  // only check if locator exists
            await expect(element).toBeVisible();
            //}
        }
    });

    test('Click Sign up now without filling required fields does not crash', async ({ page }) => {
        const popup = await openRegistrationPopup(page);
        const form = await getRegistrationForm(page, popup);

        // Ensure button is visible before clicking
        await form.submitBtn.waitFor({ state: 'visible', timeout: 5000 });

        // Capture the next alert dialog
        let alertDialog: any = null;
        page.once('dialog', (dialog) => {
            alertDialog = dialog;
            console.log('Alert appeared:', dialog.message());
        });

        // Click the button that triggers the alert
        await form.submitBtn.click({ force: true });

        // Wait a few seconds to actually see the alert
        await page.waitForTimeout(3000);

        // Accept the alert if it appeared
        if (alertDialog) {
            await alertDialog.accept();
            console.log('Alert accepted');
        } else {
            console.warn('No alert appeared within timeout');
        }

        // Continue with rest of the test
        console.log('Test continues after alert handling');
    });


    test('Click Sign up shows alert visibly', async ({ page }) => {
        const popup = await openRegistrationPopup(page);
        const form = await getRegistrationForm(page, popup);

        // Ensure button is visible
        await form.submitBtn.waitFor({ state: 'visible', timeout: 10000 });

        // Listen for the next dialog, but do not accept immediately
        let alertDialog: any;
        page.once('dialog', async (dialog) => {
            alertDialog = dialog;
            console.log('Alert appeared:', dialog.message());
        });

        // Click the button that triggers alert
        await form.submitBtn.click({ force: true });

        // Wait a few seconds to actually see the alert
        await page.waitForTimeout(3000);

        // Now close the alert
        if (alertDialog) {
            await alertDialog.accept();
            console.log('Alert accepted');
        }
    });

});