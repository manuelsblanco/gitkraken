import { test, expect } from '../fixtures/customFixtures';
import { testData } from '../fixtures/testData';
import { allure } from 'allure-playwright';

test.describe('Cart Management Flow Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(
      testData.users.standard.username,
      testData.users.standard.password
    );
  });

  test('should add items to cart successfully', async ({ inventoryPage, cartPage }) => {
    allure.epic('Shopping Cart');
    allure.feature('Add Items to Cart');
    allure.story('Add multiple products to cart');
    allure.severity('critical');
    allure.tag('smoke');

    await test.step('Add first product to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    await test.step('Add second product to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.bikeLight);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(2);
    });

    await test.step('Verify both items are in cart', async () => {
      await inventoryPage.goToCart();
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(2);
      
      const hasBackpack = await cartPage.isProductInCart(testData.products.backpack);
      const hasBikeLight = await cartPage.isProductInCart(testData.products.bikeLight);
      expect(hasBackpack).toBeTruthy();
      expect(hasBikeLight).toBeTruthy();
    });
  });

  test('should remove items from cart successfully', async ({ inventoryPage, cartPage }) => {
    allure.epic('Shopping Cart');
    allure.feature('Remove Items from Cart');
    allure.story('Remove products from cart page');
    allure.severity('critical');
    allure.tag('regression');

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.addProductToCart(testData.products.bikeLight);
      await inventoryPage.addProductToCart(testData.products.boltTShirt);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(3);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Remove one item from cart', async () => {
      await cartPage.removeItem(testData.products.bikeLight);
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(2);
    });

    await test.step('Verify removed item is not in cart', async () => {
      const hasBikeLight = await cartPage.isProductInCart(testData.products.bikeLight);
      expect(hasBikeLight).toBeFalsy();
    });

    await test.step('Verify other items remain in cart', async () => {
      const hasBackpack = await cartPage.isProductInCart(testData.products.backpack);
      const hasBoltTShirt = await cartPage.isProductInCart(testData.products.boltTShirt);
      expect(hasBackpack).toBeTruthy();
      expect(hasBoltTShirt).toBeTruthy();
    });
  });

  test('should remove items from inventory page', async ({ inventoryPage, cartPage, page }) => {
    allure.epic('Shopping Cart');
    allure.feature('Remove Items from Cart');
    allure.story('Remove products from inventory page');
    allure.severity('normal');
    allure.tag('regression');

    await test.step('Add multiple products to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.addProductToCart(testData.products.bikeLight);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(2);
    });

    await test.step('Remove one product from inventory page', async () => {
      await inventoryPage.removeProductFromCart(testData.products.backpack);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    await test.step('Verify removed item is not in cart', async () => {
      await inventoryPage.goToCart();
      
      const hasBackpack = await cartPage.isProductInCart(testData.products.backpack);
      const hasBikeLight = await cartPage.isProductInCart(testData.products.bikeLight);
      expect(hasBackpack).toBeFalsy();
      expect(hasBikeLight).toBeTruthy();
    });
  });

  test('should maintain cart state when continuing shopping', async ({ 
    inventoryPage, 
    cartPage 
  }) => {
    allure.epic('Shopping Cart');
    allure.feature('Cart State Persistence');
    allure.story('Maintain cart when continuing shopping');
    allure.severity('normal');
    allure.tag('regression');

    await test.step('Add products to cart', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      await inventoryPage.addProductToCart(testData.products.bikeLight);
    });

    await test.step('Go to cart and continue shopping', async () => {
      await inventoryPage.goToCart();
      await cartPage.continueShopping();
    });

    await test.step('Verify cart count is maintained', async () => {
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(2);
    });

    await test.step('Add another product', async () => {
      await inventoryPage.addProductToCart(testData.products.boltTShirt);
      
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe(3);
    });

    await test.step('Verify all items in cart', async () => {
      await inventoryPage.goToCart();
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(3);
    });
  });

  test('should display correct item count in cart badge', async ({ inventoryPage }) => {
    allure.epic('Shopping Cart');
    allure.feature('Cart Badge Counter');
    allure.story('Display correct item count in cart badge');
    allure.severity('normal');
    allure.tag('ui');

    await test.step('Verify initial cart is empty', async () => {
      const initialCount = await inventoryPage.getCartItemCount();
      expect(initialCount).toBe(0);
    });

    await test.step('Add items and verify count increments', async () => {
      await inventoryPage.addProductToCart(testData.products.backpack);
      expect(await inventoryPage.getCartItemCount()).toBe(1);
      
      await inventoryPage.addProductToCart(testData.products.bikeLight);
      expect(await inventoryPage.getCartItemCount()).toBe(2);
      
      await inventoryPage.addProductToCart(testData.products.boltTShirt);
      expect(await inventoryPage.getCartItemCount()).toBe(3);
    });

    await test.step('Remove one item and verify count decrements', async () => {
      await inventoryPage.removeProductFromCart(testData.products.bikeLight);
      expect(await inventoryPage.getCartItemCount()).toBe(2);
    });
  });
});
