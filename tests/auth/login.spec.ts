import { test, expect, Page } from '@playwright/test';
import { getLoginFormFrom, openPopupLogin } from '../../helpers/loginHelpers';
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
