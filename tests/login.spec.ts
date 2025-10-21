import { test, expect } from '../fixtures/customFixtures';
import { testData } from '../fixtures/testData';

test.describe('Login Flow Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should successfully login with valid standard user credentials', async ({ 
    loginPage, 
    inventoryPage 
  }) => {
    await test.step('Login with standard user', async () => {
      await loginPage.login(
        testData.users.standard.username,
        testData.users.standard.password
      );
    });

    await test.step('Verify user is redirected to inventory page', async () => {
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
  });

  test('should display error message for locked out user', async ({ loginPage }) => {
    await test.step('Attempt login with locked user', async () => {
      await loginPage.login(
        testData.users.locked.username,
        testData.users.locked.password
      );
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out');
    });
  });

  test('should display error message for invalid credentials', async ({ loginPage }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login('invalid_user', 'invalid_password');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Epic sadface: Username and password do not match');
    });
  });

  test('should display error message when username is missing', async ({ loginPage }) => {
    await test.step('Attempt login without username', async () => {
      await loginPage.login('', testData.users.standard.password);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Epic sadface: Username is required');
    });
  });

  test('should display error message when password is missing', async ({ loginPage }) => {
    await test.step('Attempt login without password', async () => {
      await loginPage.login(testData.users.standard.username, '');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Epic sadface: Password is required');
    });
  });
});
