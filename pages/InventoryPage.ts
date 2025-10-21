import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly productSortContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
  }

  async isInventoryDisplayed(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = product.locator('button[id^="add-to-cart"]');
    await addButton.click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = product.locator('button[id^="remove"]');
    await removeButton.click();
  }

  async getCartItemCount(): Promise<number> {
    try {
      const count = await this.shoppingCartBadge.textContent();
      return count ? parseInt(count) : 0;
    } catch {
      return 0;
    }
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const price = product.locator('.inventory_item_price');
    return await price.textContent() || '';
  }
}
