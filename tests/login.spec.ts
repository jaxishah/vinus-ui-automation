import { test, expect } from '@playwright/test';
import users from './test-data/users.json' assert { type: 'json' };

async function getVisibleLoginForm(page) {
  //const loginForm = page.locator('form[id^="login-form"]:visible').first();
  const loginForm =  page.locator('form[id^="login-form"]:visible').filter({ has: page.locator('a.btn_login.join') });

  return {
    username: loginForm.locator('input[name="username"]:visible'),
    password: loginForm.locator('input[name="password"]:visible'),
    loginBtn: loginForm.locator('button.btn_login:visible'),
    joinBtn: loginForm.locator('a.btn_login.join:visible')
  };
}

test.describe('Login Form Validation', () => {

  test.beforeEach(async ({ page }) => {
    //await page.goto('https://a1.vinus-solution.com/main/index',{ waitUntil: 'networkidle', timeout: 60000 });
    await page.goto('https://a1.vinus-solution.com/main/index', { waitUntil: 'domcontentloaded' });
    await page.locator('form[id^="login-form"]:visible').first().waitFor({ state: 'visible', timeout: 60000 });

  },60000);

  // 1. Check form elements are visible
  test('Login form elements should be visible', async ({ page }) => {
    const { username, password, loginBtn } = await getVisibleLoginForm(page);

    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginBtn).toBeVisible();
  });

//   // 2. Username & password are empty by default
  test('Username and Password fields should be empty initially', async ({ page }) => {
    const { username, password } = await getVisibleLoginForm(page);

    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');
  });

   // 3. Placeholders should match
  test('Username and Password placeholders should be correct', async ({ page }) => {
    const { username, password } = await getVisibleLoginForm(page);

    await expect(username).toHaveAttribute('placeholder', '아이디');
    await expect(password).toHaveAttribute('placeholder', '비밀번호 ');
  });

//  // 4. Try login with empty fields
  test('Should not login with empty credentials', async ({ page }) => {
    const { loginBtn } = await getVisibleLoginForm(page);

    await loginBtn.click();

    // Expect some error popup / message (depends on actual site behavior)
    // Example if it shows alert:
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('아이디'); // "Please enter username"
      dialog.dismiss();
    });
  });

  // 5. Try login with invalid credentials
  test('Should show error on invalid credentials', async ({ page }) => {
    const { username, password, loginBtn } = await getVisibleLoginForm(page);

    await username.fill('wronguser');
    await password.fill('wrongpass');
    await loginBtn.click();

    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('아이디와 비밀번호를 확인하세요'); // "Please enter username"
      dialog.dismiss();
    });
  });

    // 7. Successful login (if test account available)
    test('Should login successfully with valid credentials', async ({ page }) => {
        const { username, password, loginBtn } = await getVisibleLoginForm(page);

        await username.fill(users.validUser.username);
        await password.fill(users.validUser.password);
        await loginBtn.click();

        // Expect redirect / welcome message
        await expect(page).toHaveURL(/.*index/);
        // Wait for page redirect or AJAX to finish
       // await page.waitForLoadState('networkidle');

        // Wait for the nickname to appear with text
        const nickname = page.locator('#idMyNickname3');
        await expect(nickname).toHaveText(users.validUser.username, { timeout: 100000 });

    });



});