import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly cancelButton: Locator;
  readonly summaryTotal: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async isOrderComplete(): Promise<boolean> {
    return await this.completeHeader.isVisible();
  }

  async getCompleteMessage(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }

  async getTotalPrice(): Promise<string> {
    return await this.summaryTotal.textContent() || '';
  }

  async getSubtotal(): Promise<string> {
    return await this.summarySubtotal.textContent() || '';
  }

  async getTax(): Promise<string> {
    return await this.summaryTax.textContent() || '';
  }
}
