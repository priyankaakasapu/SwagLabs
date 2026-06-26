import { pageFixture } from "../hooks/pageFixture";
import { Then,Given } from "@cucumber/cucumber";
import { CartPage } from "../pages/CartPage";
// import { LoginPage} from "../pages/LoginPage";
// import { credentials } from "../testData/test.json";
// import { InventoryPage } from "../pages/InventoryPage";
// let lp:LoginPage
let cp:CartPage
// let ip:InventoryPage

Then('I verify add to cart functionality', async function () {

    cp = new CartPage(pageFixture.page);

    await cp.backpackAddToCart();
    await cp.cartCount(1);

    await cp.bikeLightAddToCart();
    await cp.cartCount(2);
});