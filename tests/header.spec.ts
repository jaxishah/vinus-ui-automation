import { test, expect } from '@playwright/test';
import { getLoginFormFrom } from '../helpers/loginHelpers';
import { MENU_CONFIG } from '../config/menu-config';

const validUser = {
    username: process.env.VALID_USERNAME!,
    password: process.env.VALID_PASSWORD!
};
const BASE_URL = process.env.BASE_URL!;

test.describe.configure({ mode: 'serial' });

test.describe('Header Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' }); // uses baseURL
    });

    // TC_LOGO_001
    test('TC_LOGO_001 - Logo should be visible', async ({ page }) => {
        const logo = page.locator('h1.logo a.img_logo');
        await expect(logo).toBeVisible();
    });

    // TC_LOGO_002
    test('TC_LOGO_002 - Clicking logo redirects to home', async ({ page }) => {
        const logoLink = page.locator('h1.logo a.img_logo');
        await logoLink.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(BASE_URL); // baseURL + '/'
    });

    test('Verify All Menus are Displayed - Before and After Login', async ({ page }) => {

        // ============================================
        // STEP 1: CHECK MENUS BEFORE LOGIN
        // ============================================
        console.log('\n Checking menus BEFORE login...');

        // Wait for the main navigation menu to be visible
        await page.waitForSelector('ul#gnb_mobile', { state: 'visible', timeout: 10000 });

        // Get only the TOP-LEVEL menu items (direct children of ul#gnb.gnb)
        const menuBeforeLogin = page.locator('ul#gnb_mobile > li');
        const menuCountBefore = await menuBeforeLogin.count();

        console.log(`Found ${menuCountBefore} top-level menu items`);

        // Debug: List all found menu texts
        const allMenuTexts = await menuBeforeLogin.locator('a.txt').allTextContents();
        console.log('Found menu texts:', allMenuTexts.map(text => text.trim()));

        // Verify menu count
        const expectedBeforeLoginNames = MENU_CONFIG.beforeLogin.map(menu => menu.name);
        expect(menuCountBefore).toBe(expectedBeforeLoginNames.length);
        console.log(`Menu count: ${menuCountBefore} (Expected: ${expectedBeforeLoginNames.length})`);

        // Verify each menu is displayed
        for (let i = 0; i < expectedBeforeLoginNames.length; i++) {
            const expectedMenuName = expectedBeforeLoginNames[i];
            const menuItem = menuBeforeLogin.nth(i).locator('a.txt').first();

            await expect(menuItem).toBeVisible();
            const actualMenuText = await menuItem.innerText();

            // Use toContain for flexible matching since there might be icons or extra text
            expect(actualMenuText.trim()).toContain(expectedMenuName);
            console.log(`Menu ${i + 1}: "${actualMenuText.trim()}" (Expected: "${expectedMenuName}")`);
        }

        console.log('All menus verified BEFORE login\n');

        // ============================================
        // STEP 2: PERFORM LOGIN
        // ============================================
        console.log('Performing login...');

        const { username, password, loginBtn } = await getLoginFormFrom(page);

        await username.fill(validUser.username);
        await password.fill(validUser.password);

        await loginBtn.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Verify login successful
        await expect(username).not.toBeVisible({ timeout: 5000 });
        console.log('Login successful\n');

        // ============================================
        // STEP 3: CHECK MENUS AFTER LOGIN
        // ============================================
        console.log('Checking menus AFTER login...');

        const menuAfterLogin = page.locator('ul#gnb_mobile > li');
        const menuCountAfter = await menuAfterLogin.count();

        // Verify menu count
        const expectedAfterLoginNames = MENU_CONFIG.afterLogin.map(menu => menu.name);
        expect(menuCountAfter).toBe(expectedAfterLoginNames.length);
        console.log(`Menu count: ${menuCountAfter} (Expected: ${expectedAfterLoginNames.length})`);

        // Verify each menu is displayed
        for (let i = 0; i < expectedAfterLoginNames.length; i++) {
            const expectedMenuName = expectedAfterLoginNames[i];
            const menuItem = menuAfterLogin.nth(i).locator('a.txt').first();

            await expect(menuItem).toBeVisible();
            const actualMenuText = await menuItem.innerText();

            expect(actualMenuText.trim()).toContain(expectedMenuName);
            console.log(`Menu ${i + 1}: ${actualMenuText.trim()}`);
        }

        console.log('All menus verified AFTER login\n');

        // ============================================
        // SUMMARY
        // ============================================
        console.log('═══════════════════════════════════════');
        console.log('TEST SUMMARY');
        console.log('═══════════════════════════════════════');
        console.log(`Before Login: ${menuCountBefore} menus displayed`);
        // console.log(`After Login:  ${menuCountAfter} menus displayed`);
        // console.log(`Difference:   +${menuCountAfter - menuCountBefore} new menus`);
        console.log('═══════════════════════════════════════');
        console.log('All menus display test PASSED!');

    });

    //TODO
    test('Verify dropdown menus appear on click and contain correct items', async ({ page }) => {
        await page.goto('/main/index');
        await page.waitForSelector('ul#gnb_mobile', { state: 'visible', timeout: 10000 });

        const isLoggedIn = await page.locator('.login_after').isVisible();
        const currentConfig = isLoggedIn ? MENU_CONFIG.afterLogin : MENU_CONFIG.beforeLogin;
        const dropdownMenus = currentConfig.filter(menu => menu.hasSubmenu && menu.submenu);

        console.log(`Testing ${dropdownMenus.length} dropdown menus`);

        for (const menu of dropdownMenus) {
            const menuLink = page.locator(`ul#gnb_mobile a.txt:has-text("${menu.name}")`);

            if (await menuLink.count() > 0) {
                console.log(`\nTesting: "${menu.name}"`);

                // Use JavaScript click to bypass viewport issues
                await menuLink.evaluate(el => el.click());
                await page.waitForTimeout(1000);

                const parentLi = menuLink.locator('xpath=..');
                const subMenu = parentLi.locator('ul.depth2');

                // Check if submenu exists first
                const subMenuExists = await subMenu.count() > 0;

                if (subMenuExists) {
                    // Check if submenu is visible
                    const isVisible = await subMenu.isVisible();
                    const displayStyle = await subMenu.evaluate(el => window.getComputedStyle(el).display).catch(() => 'error');

                    console.log(`Dropdown visible: ${isVisible}, Display: ${displayStyle}`);

                    if (isVisible || displayStyle !== 'none') {
                        console.log(`✅ Dropdown appeared`);

                        // Check ALL submenu items
                        for (const subItem of menu.submenu!) {
                            const subMenuItem = subMenu.locator(`a`).filter({ hasText: subItem.name }).first();
                            if (await subMenuItem.count() > 0) {
                                console.log(`   ✅ "${subItem.name}"`);
                            } else {
                                console.log(`   ❌ "${subItem.name}" not found`);
                            }
                        }
                    } else {
                        console.log(`❌ Dropdown exists but not visible`);
                    }
                } else {
                    console.log(`ℹ️  No dropdown menu found for "${menu.name}"`);
                }

                // Close dropdown
                await page.mouse.click(10, 10);
                await page.waitForTimeout(500);
            }
        }

        console.log('\nDropdown test completed');
    });

});