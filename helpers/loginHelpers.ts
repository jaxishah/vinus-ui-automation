import { test, expect, Page } from '@playwright/test';

// --------------------------
// Helper: get login form (inline or popup)
// --------------------------
export async function getLoginFormFrom(page, formLocator = null) {
  const loginForm = formLocator ?? page.locator('form[id^="login-form"]:visible').first();

  return {
    username: loginForm.locator('input[name="username"]:visible'),
    password: loginForm.locator('input[name="password"]:visible'),
    loginBtn: loginForm.locator('button.btn_login:visible'),
    joinBtn: loginForm.locator('a.btn-join:visible, a.btn_login.join:visible')
  };
}

// --------------------------
// Helper: open popup login via menu
// --------------------------
export async function openPopupLogin(page, menuText: string) {
    const allMenuButton = page.locator('#btn_all_menu'); // All menu button
    if (await allMenuButton.isVisible()) {
        await allMenuButton.click();
    }

    // Detect which menu is visible (desktop or mobile)
    let allMenu;
    if (await page.locator('#allmenu').isVisible()) {
        allMenu = page.locator('#allmenu');
    } else if (await page.locator('.gnb_mobile').isVisible()) {
        allMenu = page.locator('.gnb_mobile');
    } else {
        throw new Error('No menu container (#allmenu or .gnb_mobile) is visible.');
    }

    const menuItem = allMenu.locator(`a:has-text("${menuText}")`).first();
    await menuItem.scrollIntoViewIfNeeded();
    await menuItem.waitFor({ state: 'visible', timeout: 5000 });
    await menuItem.hover();
    await page.waitForTimeout(200); // small delay for animation
    await menuItem.click();

    // Wait for popup form to appear (handle both cases)
    await page.waitForTimeout(2000); // let popup render fully
    let popupForm = page.locator('form[id^="login-form0"]:visible').first();
    if (!(await popupForm.isVisible())) {
        popupForm = page.locator('form[id^="login-form"]:visible').first();
    }
    await popupForm.waitFor({ state: 'visible', timeout: 60000 });

    return popupForm;
}