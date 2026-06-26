import {Locator,Page,expect} from '@playwright/test'

export class CartPage{
    readonly page:Page
    readonly backpackLocator:Locator
    readonly bikeLightLocator:Locator
    readonly removeBackPackLocator:Locator
    readonly removebikeLightLocator:Locator
    readonly addtoCart:Locator

    constructor(page:Page){
        this.page=page
        this.backpackLocator=this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]')
        this.bikeLightLocator=this.page.locator('//button[@id="add-to-cart-sauce-labs-bike-light"]') 
        this.removeBackPackLocator =  this.page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.removebikeLightLocator = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.addtoCart=this.page.locator('.shopping_cart_badge')
    }
    
    async backpackAddToCart(){
      await this.backpackLocator.click()
      await expect(this.removeBackPackLocator).toBeVisible()
    }
    async bikeLightAddToCart(){
      await this.bikeLightLocator.click()
      await expect(this.removebikeLightLocator).toBeVisible()
    }
    async cartCount(value:number){
         const addtoCartCount = Number(await this.addtoCart.textContent())
        expect(addtoCartCount).toBeGreaterThan(0)
        expect(addtoCartCount).toBe(value)
    }
}