import { CartCheck } from "../pages/CartCheck";
import { pageFixture } from "../hooks/pageFixture";
import {Then} from "@cucumber/cucumber"
import { LoginPage } from "../pages/LoginPage";
import {credentials} from '../testData/test.json'
import { CartPage } from "../pages/CartPage";

let lp:LoginPage
let cc:CartCheck
let cp:CartPage
Then('I verify cart Functionalities', async function () {
   cc=new CartCheck(pageFixture.page)
   cp=new CartPage(pageFixture.page)
    await cp.backpackAddToCart()
    console.log("added backpack")
    await cp.bikeLightAddToCart()
     console.log("added bikelight")
     await cc.navigateTocartPage()
   await cc.verifyListItems()
   await cc.removeProducts()
});

