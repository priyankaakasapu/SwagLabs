import {Locator, Page,expect} from '@playwright/test'

export class CheckoutPage{
    readonly page:Page
    readonly checkout:Locator
    readonly pageTitle:Locator
    readonly firstName:Locator
    readonly lastName:Locator
    readonly postalCode:Locator
    readonly continueBtn:Locator
    readonly chkOutOverview:Locator

    constructor(page:Page){
        this.page=page
        this.checkout=this.page.getByRole('button',{name:'Checkout'})
        this.pageTitle=this.page.getByText('Checkout: Your Information')
        this.firstName=this.page.getByPlaceholder('First Name')
        this.lastName=this.page.getByPlaceholder('Last Name')
        this.postalCode=this.page.getByPlaceholder('Zip/Postal Code')
        this.continueBtn=this.page.locator('#continue')
         this.chkOutOverview=this.page.getByText('Checkout: Overview')
        
    }
    async clickOnChkout(){
        await this.checkout.click()
        await expect(this.page).toHaveURL(/checkout-step-one.html/)
        await expect(this.pageTitle).toBeVisible()
    }
    async enterUserInfo(firstName:string,lastName:string,postalCode:string){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.postalCode.fill(postalCode)
        await this.continueBtn.click()
    }
    async verifyChkOutOverview(){
        await expect(this.chkOutOverview).toBeVisible()
    }


}