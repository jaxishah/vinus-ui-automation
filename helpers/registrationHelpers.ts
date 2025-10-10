import { test, expect, Page } from '@playwright/test';

// Helper: get registration form fields
export async function getRegistrationForm(page, formLocator = null) {
    const form = formLocator ?? page.locator('form#regist-form-lo:visible').first();
    const popupContainer = form.locator('xpath=..').locator('..'); // go up to popup wrapper
    return {
        username: form.locator('input[name="username"]'),
        password: form.locator('input[name="passwd"]'),
        confirmPassword: form.locator('input[name="passwd2"]'),
        nickname: form.locator('input[name="nickname"]'),
        name: form.locator('input[name="name"]'),
        birthday: form.locator('input[name="birthday"]'),
        phoneHp1: form.locator('select[name="hp1"]'),
        phoneHp2: form.locator('input[name="hp2"]'),
        phoneHp3: form.locator('input[name="hp3"]'),
        bank: form.locator('select[name="bank"]'),
        bankOwner: form.locator('input[name="bank_owner"]'),
        referralCode: form.locator('input[name="branch_code"]'),
        accountNumber: form.locator('input[name="bank_no"]'),
        sendVerificationBtn: form.locator('button.btn_ui.btn_medium.gray'),
        submitBtn: popupContainer.locator('button.btn_ui.btn_md.btn_red')
    };
}


export async function openRegistrationPopup(page: Page): Promise<Locator> {
    // Locate the main login/join button
    const joinBtn = page.locator('a.btn_login.join');

    // Wait until the button exists and is visible
    await joinBtn.waitFor({ state: 'visible', timeout: 60000 });

    // Scroll into view just in case
    await joinBtn.scrollIntoViewIfNeeded();

    // Click the button
    await joinBtn.click();

    // Wait for registration popup
    const registrationPopup = page.locator('form[id*="join"]:visible, form[id^="regist-form"]:visible').first();
    await registrationPopup.waitFor({ state: 'visible', timeout: 10000 });

    return registrationPopup;
}

