import {expect,Locator,Page} from '@playwright/test'

export class InventoryPage{

    readonly page:Page
    readonly productList:Locator
    readonly productsPage:Locator

    constructor(page:Page){
      this.page=page
      this.productList=this.page.locator('//div[@class="inventory_item_name "]')
      this.productsPage=this.page.locator('.title')
    }
    async verifyInventoryPage(){
      await expect(this.page).toHaveURL(/inventory/)
      await expect(this.productsPage).toHaveText('Products')
    }

    async verifyProductCount(){
      const count = await this.productList.count()
      expect(count).toBe(6)
    }
    async verifyProductNames(){
      const count = await this.productList.count()
      for(let i=0;i<count;i++){
        let productName = await this.productList.nth(i).textContent()
        console.log(productName)
      }
    }
}

