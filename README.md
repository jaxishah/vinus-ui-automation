# Playwright Test Suite

Requirements:

Node.js v22.20.0

Playwright Test framework

## How to Run

1. Clone the repo

   git clone https://github.com/jaxishah/vinus-ui-automation.git
   cd your-playwright-project

2. Install dependencies

    npm install

3. Install Playwright browsers

    npx playwright install --with-deps

4. Create a .env file in the project root for sensitive credentials

    # .env example
    VALID_USERNAME=your_username
    VALID_PASSWORD=your_password
    BASE_URL=https://a1.vinus-solution.com/main/index

5. Run tests

    npx playwright test - Run all tests
    npx playwright test tests/auth/login.spec.ts - Run a single test file
    npx playwright test --ui  - Run with UI mode (to debug)

6. View report

    npx playwright show-report



