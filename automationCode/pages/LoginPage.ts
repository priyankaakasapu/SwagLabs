import {expect,Locator,Page} from '@playwright/test'

export class LoginPage{
    readonly page:Page
    readonly sauceHeading:Locator
    readonly username:Locator
    readonly password:Locator
    readonly loginBtn:Locator
    readonly sideMenu:Locator
    readonly logoutBtn:Locator
    readonly productsPage:Locator
    readonly errorMessage:Locator
    
    constructor(page:Page){
        this.page=page
         this.sauceHeading=this.page.getByText('Swag Labs')
         this.username=this.page.getByPlaceholder('Username')
         this.password=this.page.getByPlaceholder('Password')
         this.loginBtn=this.page.getByRole('button',{name:'Login'})
         this.sideMenu=this.page.locator('//div[@class="bm-burger-button"]')
         this.logoutBtn=this.page.locator('#logout_sidebar_link')
         this.productsPage=this.page.locator('.title')
         this.errorMessage=this.page.locator('//h3[text()="Epic sadface: Username and password do not match any user in this service"]')
    }
    async verifyWebElements(){
        await expect(this.sauceHeading).toBeVisible()
        await expect(this.username).toBeVisible()
        await expect(this.password).toBeVisible()
        await expect(this.loginBtn).toBeVisible()
    }
    async navigateToApplication(url:string,title:string){
        await this.page.goto(url)
        await expect(this.page).toHaveTitle(title)
    }
    async login(username:string,password:string){
       await this.username.fill(username)
       await this.password.fill(password)
       await this.loginBtn.click()  
    }
    async verifyDashboardPage(){
       await expect(this.page).toHaveURL(/inventory/)
       await expect(this.sideMenu).toBeVisible()
       await this.sideMenu.click()
       await expect(this.logoutBtn).toBeVisible()
       await expect(this.productsPage).toHaveText('Products') 
    }
    async verifyErrorMessage(){
       await expect(this.errorMessage).toBeVisible()
    }
}

