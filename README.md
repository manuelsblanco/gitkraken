## Table of Contents

- Features
- Project Structure
- Prerequisites
- Installation
- Configuration
- Running Tests
- Viewing Reports
- CI/CD Pipeline
- Test Coverage
- Design Decisions

## Features

- Page Object Model (POM): Clean separation of test logic and page interactions
- TypeScript: Type-safe test automation with full IDE support
- Parallel Execution: Fast test execution with configurable workers
- Environment Configuration: Flexible configuration using environment variables
- Allure Reporting: Detailed test reports with history tracking
- CI/CD Integration: Automated testing with GitHub Actions
- GitHub Pages Deployment: Publicly accessible test reports
- Daily Scheduled Runs: Automated regression testing

## Project Structure

```
playwright-saucedemo-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
├── pages/                          # Page Object Models
│   ├── LoginPage.ts               # Login page interactions
│   ├── InventoryPage.ts           # Product inventory page
│   ├── CartPage.ts                # Shopping cart page
│   └── CheckoutPage.ts            # Checkout process pages
├── tests/                          # Test specifications
│   ├── login.spec.ts              # Login flow tests
│   ├── cart.spec.ts               # Cart management tests
│   └── purchase.spec.ts           # E2E purchase flow tests
├── fixtures/                       # Test fixtures and helpers
│   ├── customFixtures.ts          # Custom Playwright fixtures
│   └── testData.ts                # Test data and configuration
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── .env.example                    # Environment variables template
```

## Prerequisites

- Node.js: v18 or higher
- npm: v9 or higher
- Git: For version control

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/manuelsblanco/gitkraken.git
   cd gitkraken
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install chromium
   ```

4. Setup environment variables
   ```bash
   cp .env.example .env
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=https://www.saucedemo.com
STANDARD_USER=standard_user
LOCKED_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user
PASSWORD=secret_sauce
HEADLESS=true
TIMEOUT=30000
```

### Playwright Configuration

The `playwright.config.ts` file includes:
- Browser: Chromium only (optimized for speed)
- Parallel Execution: Enabled for faster test runs
- Reporters: HTML + Allure
- Retry Strategy: 1 retry in CI, 0 locally
- Tracing: On first retry
- Screenshots: On failure

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests by grep pattern
```bash
npx playwright test --grep "login"
```

## Viewing Reports

### View Playwright HTML Report
```bash
npm run report
```

### Generate and View Allure Report
```bash
npm run allure:generate
npm run allure:open
```

### View Reports in GitHub Pages

After tests run in CI/CD, reports are automatically published to GitHub Pages:

URL Format: `https://manuelsblanco.github.io/gitkraken/reports/BUILD_NUMBER/`

Latest Report: Check the index page at `https://manuelsblanco.github.io/gitkraken/`

## CI/CD Pipeline

### GitHub Actions Workflow

The workflow automatically:
1. Runs on push, pull request, and daily schedule (9:00 AM UTC)
2. Installs dependencies and Playwright
3. Executes all tests in parallel
4. Generates Allure and HTML reports
5. Publishes reports to GitHub Pages
6. Comments on PRs with report links

### Setup GitHub Pages

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages → / (root)
4. Click Save

Reports will be available at: `https://manuelsblanco.github.io/gitkraken/`

### Workflow Triggers

- Push: On commits to main or master
- Pull Request: On PRs to main or master
- Schedule: Daily at 9:00 AM UTC
- Manual: Via GitHub Actions UI (workflow_dispatch)

## Test Coverage

### 1. Login Flow Tests (`login.spec.ts`)
- Successful login with valid credentials
- Error message for locked out user
- Error message for invalid credentials
- Error message when username is missing
- Error message when password is missing

### 2. Cart Management Tests (`cart.spec.ts`)
- Add items to cart successfully
- Remove items from cart
- Remove items from inventory page
- Maintain cart state when continuing shopping
- Display correct item count in cart badge

### 3. End-to-End Purchase Tests (`purchase.spec.ts`)
- Complete full purchase flow (login → add items → checkout → confirmation)
- Purchase with single item
- Purchase with multiple items
- Verify order summary and totals

## Design Decisions

### Why Page Object Model?
- Maintainability: Changes to UI only require updates in one place
- Reusability: Page objects can be used across multiple tests
- Readability: Tests focus on business logic, not implementation details

### Why Custom Fixtures?
- Type Safety: Full TypeScript support for page objects
- Automatic Initialization: Pages are created automatically for each test
- Clean Tests: No need to manually instantiate page objects

### Why Environment Variables?
- Flexibility: Easy to change configuration without code changes
- Security: Sensitive data not hardcoded in tests
- CI/CD Friendly: Different configurations for different environments

### Why Chromium Only?
- Speed: Faster test execution (3-4x faster than multi-browser)
- Consistency: Single browser ensures consistent results
- Optimization: Most users are on Chromium-based browsers (70%+)

### Why Allure Reports?
- Detailed: Step-by-step execution with screenshots
- Historical: Track test trends over time
- Professional, easy-to-read reports
- Integration: Works seamlessly with CI/CD




