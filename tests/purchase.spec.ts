import { test, expect } from '../fixtures/customFixtures';
import { testData } from '../fixtures/testData';
import { allure } from 'allure-playwright';

test.describe('End-to-End Purchase Flow Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(
      testData.users.standard.username,
      testData.users.standard.password
    );
  });

  test('should complete full purchase flow successfully', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    allure.epic('Checkout');
    allure.feature('Complete Purchase Flow');
    allure.story('End-to-end purchase with multiple items');
    allure.severity('blocker');
    allure.tag('smoke');
    allure.tag('e2e');

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.addProductToCart(testData.products.bikeLight);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(2);
    });

    await test.step('Navigate to cart and verify items', async () => {
      await inventoryPage.goToCart();
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(2);
      
      const hasBackpack = await cartPage.isProductInCart(testData.products.backpack);
      const hasBikeLight = await cartPage.isProductInCart(testData.products.bikeLight);
      expect(hasBackpack).toBeTruthy();
      expect(hasBikeLight).toBeTruthy();
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step('Fill checkout information', async () => {
      await checkoutPage.fillInformation(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
      );
      await checkoutPage.continue();
    });

    await test.step('Verify order summary and complete purchase', async () => {
      await expect(checkoutPage.summarySubtotal).toBeVisible();
      await expect(checkoutPage.summaryTax).toBeVisible();
      await expect(checkoutPage.summaryTotal).toBeVisible();
      
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify order completion', async () => {
      const isComplete = await checkoutPage.isOrderComplete();
      expect(isComplete).toBeTruthy();
      
      const completeMessage = await checkoutPage.getCompleteMessage();
      expect(completeMessage).toContain('Thank you for your order!');
    });
  });

  test('should complete purchase with single item', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    allure.epic('Checkout');
    allure.feature('Complete Purchase Flow');
    allure.story('Purchase with single item');
    allure.severity('critical');
    allure.tag('regression');

    await test.step('Add single product to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.fleeceJacket);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    await test.step('Complete checkout process', async () => {
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      
      await checkoutPage.fillInformation(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
      );
      await checkoutPage.continue();
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify successful order', async () => {
      const isComplete = await checkoutPage.isOrderComplete();
      expect(isComplete).toBeTruthy();
    });
  });

  test('should complete purchase with multiple items', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    allure.epic('Checkout');
    allure.feature('Complete Purchase Flow');
    allure.story('Purchase with multiple items');
    allure.severity('critical');
    allure.tag('regression');
    allure.tag('e2e');

    const productsToAdd = [
      testData.products.backpack,
      testData.products.bikeLight,
      testData.products.boltTShirt,
    ];

    await test.step('Add multiple products to cart', async () => {
      for (const product of productsToAdd) {
        await inventoryPage.addProductToCart(product);
      }
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(productsToAdd.length);
    });

    await test.step('Verify all items in cart', async () => {
      await inventoryPage.goToCart();
      
      for (const product of productsToAdd) {
        const isInCart = await cartPage.isProductInCart(product);
        expect(isInCart).toBeTruthy();
      }
    });

    await test.step('Complete checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.fillInformation(
        testData.checkoutInfo.firstName,
        testData.checkoutInfo.lastName,
        testData.checkoutInfo.postalCode
      );
      await checkoutPage.continue();
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify order completion', async () => {
      await expect(checkoutPage.completeHeader).toBeVisible();
    });
  });
});
