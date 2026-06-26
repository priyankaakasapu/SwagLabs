 import { pageFixture } from "../hooks/pageFixture";
 import { ChkOutOverviewPage } from "../pages/ChkOutOverviewPage";
 import { CartPage } from "../pages/CartPage";
 import { CartCheck } from "../pages/CartCheck";
 import { CheckoutPage } from "../pages/CheckoutPage";
 import { userInfo,thankyouURL } from "../testData/test.json";
 import {Then} from '@cucumber/cucumber'
 let ct:CartPage
 let cc:CartCheck
 let cp:CheckoutPage
let co:ChkOutOverviewPage

Then('I Verify Checkout Overview page Info', async function () {
   co=new ChkOutOverviewPage(pageFixture.page)
    ct=new CartPage(pageFixture.page)
    cc=new CartCheck(pageFixture.page)
    cp=new CheckoutPage(pageFixture.page)
    await ct.backpackAddToCart();
    await ct.bikeLightAddToCart();
    await cc.navigateTocartPage()
    await cp.clickOnChkout()
    await cp.enterUserInfo(userInfo.firstName,userInfo.lastName,userInfo.pincode)
    await cc.verifyListItems()
    await co.verifyOverviewPage()
    await co.clickOnFinish() 
    await co.verifyThankyouMessage(thankyouURL.url)
});
       