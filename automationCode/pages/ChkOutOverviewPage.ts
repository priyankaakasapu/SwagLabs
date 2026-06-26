import {expect,Locator,Page} from '@playwright/test'
export class ChkOutOverviewPage{
  readonly page:Page
  readonly chkOverview:Locator
  readonly paymentInformation:Locator
  readonly shippingInformation:Locator
  readonly priceTotal:Locator
  readonly finish:Locator
  readonly thankyouMsg :Locator
  constructor(page:Page){
    this.page=page
        this.chkOverview=this.page.getByText('Checkout: Overview')
        this.paymentInformation=this.page.getByText('Payment Information:')
        this.shippingInformation=this.page.getByText('Shipping Information:')
        this.priceTotal=this.page.getByText('Price Total')
        this.finish=this.page.getByRole('button',{name:'Finish'})
        this.thankyouMsg=this.page.getByText('Thank you for your order!')
  }
  async verifyOverviewPage(){
       await expect(this.chkOverview).toBeVisible()
       await expect(this.paymentInformation).toBeVisible()
       await expect(this.shippingInformation).toBeVisible()
       await expect(this.priceTotal).toBeVisible()
  } 
  async clickOnFinish(){
    await this.finish.click()
  }
  async verifyThankyouMessage(url:string){
    await expect(this.page).toHaveURL(url)
    await expect(this.thankyouMsg).toBeVisible()
  }
}