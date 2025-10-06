import { test, expect, Page } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();
test.describe.configure({ mode: 'serial' });

const validUser = {
  username: process.env.VALID_USERNAME!,
  password: process.env.VALID_PASSWORD!
};
const BASE_URL = process.env.BASE_URL!;

// test('has title', async ({ page }: { page: Page }) => {
//   await page.goto('https://playwright.dev/');
// });

// --------------------------
// Helper: get login form (inline or popup)
// --------------------------
async function getLoginFormFrom(page, formLocator = null) {
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
async function openPopupLogin(page, menuText: string) {
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
    await popupForm.waitFor({ state: 'visible', timeout: 30000 });

    return popupForm;
}

// --------------------------
// Tests
// --------------------------
test.describe('Login Form Tests (Inline & Popup)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  }, 60000);

  // --------------------------
  // INLINE LOGIN TESTS
  // --------------------------
  test.describe('Inline Login Form', () => {

    test('Elements should be visible', async ({ page }) => {
      const { username, password, loginBtn } = await getLoginFormFrom(page);
      await expect(username).toBeVisible();
      await expect(password).toBeVisible();
      await expect(loginBtn).toBeVisible();
    });

    test('Fields should be empty initially', async ({ page }) => {
      const { username, password } = await getLoginFormFrom(page);
      await expect(username).toHaveValue('');
      await expect(password).toHaveValue('');
    });

    test('Placeholders should be correct', async ({ page }) => {
      const { username, password } = await getLoginFormFrom(page);
      await expect(username).toHaveAttribute('placeholder', '아이디');
      await expect(password).toHaveAttribute('placeholder', '비밀번호 ');
    });

    test('Should not login with empty credentials', async ({ page }) => {
      const { loginBtn } = await getLoginFormFrom(page);

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('아이디'); // adjust message if needed
        await dialog.dismiss();
      });

      await loginBtn.click();
    });

    test('Should show error on invalid credentials', async ({ page }) => {
      const { username, password, loginBtn } = await getLoginFormFrom(page);

      await username.fill('wronguser');
      await password.fill('wrongpass');

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('아이디와 비밀번호를 확인하세요'); // adjust message
        await dialog.dismiss();
      });

      await loginBtn.click();
    });

    test('Should login successfully with valid credentials', async ({ page }) => {
      const { username, password, loginBtn } = await getLoginFormFrom(page);

      await username.fill(validUser.username);
      await password.fill(validUser.password);
      await loginBtn.click();


      const nickname = page.locator('#idMyNickname3');
      await expect(nickname).toHaveText(validUser.username, { timeout: 30000 });
    });

  });

  // --------------------------
  // POPUP LOGIN TESTS
  // --------------------------
  test.describe('Popup Login Form', () => {

    test('Elements should be visible', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { username, password, loginBtn } = await getLoginFormFrom(page, popupForm);
      await expect(username).toBeVisible();
      await expect(password).toBeVisible();
      await expect(loginBtn).toBeVisible();
    });

    test('Fields should be empty initially', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { username, password } = await getLoginFormFrom(page, popupForm);
      await expect(username).toHaveValue('');
      await expect(password).toHaveValue('');
    });

    test('Placeholders should be correct', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { username, password } = await getLoginFormFrom(page, popupForm);
      await expect(username).toHaveAttribute('placeholder', '최대20자(영문,숫자,- 제외 특수문자 불가).');
      await expect(password).toHaveAttribute('placeholder', '현재 비밀번호를 입력하세요');
    });

    test('Should not login with empty credentials', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { loginBtn } = await getLoginFormFrom(page, popupForm);

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('아이디'); 
        await dialog.dismiss();
      });

      await loginBtn.click();
    });

    test('Should show error on invalid credentials', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { username, password, loginBtn } = await getLoginFormFrom(page, popupForm);

      await username.fill('wronguser');
      await password.fill('wrongpass');

      page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('아이디와 비밀번호를 확인하세요');
        await dialog.dismiss();
      });

      await loginBtn.click();
    });

    test('Should login successfully with valid credentials', async ({ page }) => {
      const popupForm = await openPopupLogin(page, '카지노');
      const { username, password, loginBtn } = await getLoginFormFrom(page, popupForm);

      await username.fill(validUser.username);
      await password.fill(validUser.password);
      await loginBtn.click();

      await page.waitForLoadState('networkidle');

      const nickname = page.locator('#idMyNickname3');
      await expect(nickname).toHaveText(validUser.username, { timeout: 10000 });
    });

  });

});
