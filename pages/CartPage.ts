import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    const removeButton = item.locator('button[id^="remove"]');
    await removeButton.click();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    return await item.count() > 0;
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getItemPrice(productName: string): Promise<string> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    const price = item.locator('.inventory_item_price');
    return await price.textContent() || '';
  }
}
