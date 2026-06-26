import {Page,Locator,expect} from '@playwright/test'

export class CartCheck{
    readonly page:Page
    readonly list:Locator
    readonly backPackProduct:Locator
    readonly bikeLightProduct:Locator
    readonly removeBackPack:Locator
    readonly removeBackLight:Locator
    readonly addtoCart:Locator

    constructor(page:Page){
        this.page=page
        this.list=this.page.locator('[data-test="inventory-item-name"]')
        this.backPackProduct = this.page.getByText('Sauce Labs Backpack')
        this.bikeLightProduct=this.page.getByText('Sauce Labs Bike Light')
        this.removeBackPack =  this.page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.removeBackLight = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.addtoCart=this.page.locator('//a[@class="shopping_cart_link"]')
    }
    async verifyListItems(){
        await expect(this.list).toHaveCount(2)
        await expect(this.backPackProduct).toBeVisible()
        await expect(this.bikeLightProduct).toBeVisible()
    }
    async removeProducts(){
       await this.removeBackLight.click()
       await this.removeBackPack.click()
       await expect(this.list).toHaveCount(0)
    }
    async navigateTocartPage(){
        await this.addtoCart.click()
    }
}