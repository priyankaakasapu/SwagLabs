import { pageFixture } from "../hooks/pageFixture";
import {Then} from '@cucumber/cucumber'
import {CheckoutPage} from '../pages/CheckoutPage'
import {userInfo} from '../testData/test.json'
import {expect} from '@playwright/test'
import { CartPage } from "../pages/CartPage";
import { CartCheck } from "../pages/CartCheck";

let ct:CartPage
let cc:CartCheck
let cp:CheckoutPage
Then('I Verify Checkout page Functionalities', async function () {
    ct=new CartPage(pageFixture.page)
    cc=new CartCheck(pageFixture.page)
    cp=new CheckoutPage(pageFixture.page)
    await ct.backpackAddToCart();
    await ct.bikeLightAddToCart();
    await cc.navigateTocartPage()
    await cp.clickOnChkout()
    await cp.enterUserInfo(userInfo.firstName,userInfo.lastName,userInfo.pincode)
    await expect(pageFixture.page).toHaveURL(/checkout-step-two.html/)
    await cp.verifyChkOutOverview()
});

