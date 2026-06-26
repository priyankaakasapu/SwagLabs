import { pageFixture } from "../hooks/pageFixture";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { credentials } from "../testData/test.json";
import {Then} from '@cucumber/cucumber'
let ip:InventoryPage
let lp:LoginPage
Then('I Verify Inventory page Functionalities',async function(){
   lp=new LoginPage(pageFixture.page)
   ip=new InventoryPage(pageFixture.page)
   await ip.verifyInventoryPage()  
   await ip.verifyProductCount()
   await ip.verifyProductNames()
   
})