import {Locator,Page,expect} from '@playwright/test'

export class SortPage{
    readonly page:Page
    readonly dropdown:Locator
    readonly list:Locator

    constructor(page:Page){
        this.page=page
        this.dropdown=this.page.locator('.product_sort_container')
        this.list=this.page.locator('[data-test="inventory-item-name"]').first()
    }
    async verifyDropdown() {
        await this.dropdown.selectOption('az');
        await expect(this.dropdown).toHaveValue('az');
        await expect(this.list).toHaveText('Sauce Labs Backpack');

        await this.dropdown.selectOption('za');
        await expect(this.dropdown).toHaveValue('za');
        await expect(this.list).toHaveText('Test.allTheThings() T-Shirt (Red)');

        await this.dropdown.selectOption('lohi');
        await expect(this.dropdown).toHaveValue('lohi');
        await expect(this.list).toHaveText('Sauce Labs Onesie');

        await this.dropdown.selectOption('hilo');
        await expect(this.dropdown).toHaveValue('hilo');
        await expect(this.list).toHaveText('Sauce Labs Fleece Jacket');
    }
}