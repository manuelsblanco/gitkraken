### 1. **Project Structure** 
```
playwright-saucedemo-tests/
├── .github/workflows/playwright.yml    # CI/CD Pipeline
├── pages/                             # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                             # Test Specifications
│   ├── login.spec.ts (5 tests)
│   ├── cart.spec.ts (5 tests)
│   └── purchase.spec.ts (3 tests)
├── fixtures/
│   ├── customFixtures.ts              # Custom Playwright fixtures
│   └── testData.ts                    # Test data with environment variables
├── playwright.config.ts               # Playwright + Allure configuration
├── package.json
├── tsconfig.json
└── README.md                          # Complete documentation
```

### 2. **Page Object Models (POM)** 
Four Page Objects were implemented following best practices:
- **LoginPage**: Login and error handling
- **InventoryPage**: Product and cart management
- **CartPage**: Shopping cart operations
- **CheckoutPage**: Complete checkout process

### 3. **Test Suite - 13 Automated Tests** 

#### **Login Flow (5 tests)**
-  Successful login with valid user
-  Error for locked out user
-  Error for invalid credentials
-  Error when username is missing
-  Error when password is missing

#### **Cart Management (5 tests)**
-  Add items to cart
-  Remove items from cart
-  Remove items from inventory
-  Maintain cart state when continuing shopping
-  Validate item count in badge

#### **E2E Purchase Flow (3 tests)**
-  Complete purchase flow (login → add → checkout → confirmation)
-  Purchase with a single item
-  Purchase with multiple items

### 4. **Configuration** 

#### **Playwright Config**
-  Chromium only (optimized for speed)
-  Parallel execution (4 workers in CI)
-  Timeouts: 60s per test, 45s navigation, 15s actions
-  Automatic retry: 2 attempts in CI, 1 locally
-  Screenshots on failures
-  Videos retained on failures
-  Trace on first retry
-  Reports: HTML + Allure

#### **Environment Variables**
-  `.env` file with test users
-  Secure passwords (not hardcoded)
-  Configurable base URL

### 5. **CI/CD - GitHub Actions** 

The workflow includes:
-  Trigger on: push, pull_request, schedule (daily 9 AM UTC), manual
-  Automatic dependency installation
-  Parallel test execution
-  Allure report generation
-  Automatic publishing to GitHub Pages
-  Index page with report links
-  Automatic PR comments with report links
-  Report history by build number

### 6. **Documentation** 
-  Complete README.md with:
  - Installation instructions
  - Configuration guide
  - Execution commands
  - Project structure
  - Design decisions
  - Guidelines for writing tests

### Justified Design Decisions
- **Chromium Only**: Speed > Coverage (70%+ users use Chromium)
- **Parallel Execution**: Reduce execution time
- **Retry Strategy**: Handle network flakiness
- **Environment Variables**: Flexibility and security
- **Allure Reports**: Professional and detailed

---

## Useful Commands

```bash
# Install dependencies
npm install

# Install browser
npx playwright install chromium

# Run tests
npm test

# Run in headed mode
npm run test:headed

# View HTML report
npm run report

# Generate and view Allure
npm run allure:generate
npm run allure:open

# Run specific test
npx playwright test tests/login.spec.ts

# Debug mode
npm run test:debug
```




