import { test, expect } from '@playwright/test';
const BASE_URL = process.env.BASE_URL!;
import { MENU_CONFIG } from '../config/menu-config';
import { getLoginFormFrom, openPopupLogin } from '../helpers/loginHelpers';


test.describe.configure({ mode: 'serial' });

const MOBILE_MENU = 'ul#gnb_mobile';
const TARGET_MENU_NAME = '미니 게임';
const LOGIN_POPUP = '#login-form'; // your login form id

const validUser = {
    username: process.env.VALID_USERNAME!,
    password: process.env.VALID_PASSWORD!
};

// Utility function to log in
const login = async (page) => {

    // const popupForm = await openPopupLogin(page, '카지노');
    const { username, password, loginBtn } = await getLoginFormFrom(page);

    await username.fill(validUser.username);
    await password.fill(validUser.password);
    await loginBtn.click();

    await page.waitForLoadState('networkidle');

    const nickname = page.locator('#idMyNickname3');
    await expect(nickname).toHaveText(validUser.username, { timeout: 10000 });
};

// menu and submenu click
const menuClick = async (page) => {
    // Locate the main menu <li> and its <a>
    const mainMenuLi = page.locator('ul#gnb_mobile > li', { hasText: '미니 게임' });
    const mainMenuLink = mainMenuLi.locator('> a');

    // Reveal submenu (force click via JS)
    await mainMenuLink.evaluate(el => el.click());
    await page.waitForTimeout(300); // give submenu time to appear

    // Locate second submenu
    const secondSubMenu = mainMenuLi.locator('ul.depth2 > li > a').nth(15);

    // Wait until attached to DOM
    await secondSubMenu.waitFor({ state: 'attached', timeout: 5000 });

    // Click via JS directly (bypasses hidden/interactable issues)
    await secondSubMenu.evaluate(el => el.click());
};

// parses the balance number from text like "10,830"
async function getBalance(locator) {
    const text = (await locator.textContent())?.trim() || '0';
    return Number(text.replace(/[^\d]/g, ''));
}

// waits until balance changes from previous value
async function waitForBalanceUpdate(page, locator, previousValue: number, timeout = 5000) {
    await page.waitForTimeout(1000); // small  interval
    const start = Date.now();
    let currentValue = previousValue;

    while (Date.now() - start < timeout) {
        currentValue = await getBalance(locator);
        if (currentValue !== previousValue) {
            console.log(`Balance updated: ${currentValue}`);
            return currentValue;
        }
        await page.waitForTimeout(500); // small polling interval
    }

    throw new Error('Balance did not update within timeout');
}

// Fill bet amount
async function fillBetAmount(page, betAmount: string | number | null | undefined) {
    const betInput = page.locator('#idCartBetMoney');
    const value = betAmount != null ? String(betAmount) : '';
    await betInput.fill(value);
    console.log(`\betAmount: "${value}"`);
}

// Select product
async function selectProduct(page, productId?: string) {
    let productLocator;
    if (productId) {
        productLocator = page.locator(`#${productId}`);
    } else {
        productLocator = page.locator('.minigame_row .bet_label.bet_box_').first();
    }

    await productLocator.waitFor({ state: 'visible', timeout: 5000 });
    await productLocator.scrollIntoViewIfNeeded();
    await productLocator.click({ force: true, noWaitAfter: true });

    const productText = await productLocator.evaluate(el => {
        const item = el.closest('.minigame_item');
        if (!item) return '';
        const titleEl = item.querySelector('.minigame_title');
        return titleEl?.textContent?.trim() || '';
    });
    
    console.log(`productText: ${productText}`);
    return productText?.trim() || '';
    
}

// Confirm bet and handle alert
async function confirmBet(page) {
    const confirmBtn = page.locator('.btn_confirm_bet');
    page.once('dialog', async dialog => {
        console.log('Alert message:', dialog.message());
        await page.waitForTimeout(3000);
        await dialog.accept();
    });
    await confirmBtn.waitFor({ state: 'visible', timeout: 5000 });
    await confirmBtn.scrollIntoViewIfNeeded();
    await confirmBtn.click({ force: true });
}

// scroll to bet history table
async function scrollToBetHistory(page, expectedBetAmount: number, expectedProduct?: string) {
    const rowsLocator = page.locator('#idMyBetting tr');

    // Verify the latest row
    const newRow = rowsLocator.first();

    const betAmountText = await newRow.locator('td:nth-child(5)').textContent();
    const betAmount = Number(betAmountText?.replace(/[^\d]/g, '') || 0);
    await expect(betAmount).toBe(expectedBetAmount);
    console.log(`Bet amount verified: ${betAmount}`);

    const productText = await newRow.locator('td:nth-child(3)').textContent();
    await expect(productText).toContain(expectedProduct);
    console.log(`Product verified: ${productText}`);
}

// place a bet on game
const placeMiniGameBet = async (page, betAmount: string | number, productId?: string) => {
    // Wait a bit and get current balance
    await page.waitForTimeout(3000);
    const balanceLocator = page.locator('#idMyMoney3');
    const balanceBefore = await getBalance(balanceLocator);

    console.log(`Balance before bet: ${balanceBefore}`);

    // Fill bet amount
    await fillBetAmount(page, betAmount);

    // Select product
    const selectedProduct = await selectProduct(page, productId);

    // Confirm bet
    await confirmBet(page);

    // Wait for balance to update
    const balanceAfter = await waitForBalanceUpdate(page, balanceLocator, balanceBefore, 5000);
    console.log(`Balance after bet: ${balanceAfter}`);

    // Verify balance
    const expectedBalance = balanceBefore - Number(betAmount);
    await expect(balanceAfter, 'Balance should decrease by bet amount').toBe(expectedBalance);
    console.log(`Balance correctly updated: ${balanceBefore} → ${balanceAfter}`);

    // Scroll to bet history
    await scrollToBetHistory(page, betAmount, selectedProduct);
};

test.describe('Mini Game Betting', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
        await login(page);
        await menuClick(page); // if all tests require navigation to the mini game
    });

    test('Place a bet with valid amount and product', async ({ page }) => {
       
        await placeMiniGameBet(page, 40);

        await page.waitForTimeout(10000); // 5 seconds pause


    });

});



