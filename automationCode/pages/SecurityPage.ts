// SecurityPage.ts
import { Page, expect } from "@playwright/test";

export class SecurityPage {
     readonly page:Page
    constructor(page: Page) {
        this.page=page
    }

    async verifyProtectedPages() {

        const protectedPages = ['/inventory.html','/cart.html','/checkout-step-one.html'];

        for (const url of protectedPages) {
            await this.page.goto(`https://www.saucedemo.com${url}`);
            await expect(this.page).toHaveURL('https://www.saucedemo.com/');
        }
    }
}