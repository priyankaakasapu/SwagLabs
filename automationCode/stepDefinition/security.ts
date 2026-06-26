import { Then } from "@cucumber/cucumber";
import { SecurityPage } from "../pages/SecurityPage";
import { pageFixture } from "../hooks/pageFixture";

Then('I verify protected pages cannot be accessed without login', async function () {

    const securityPage = new SecurityPage(pageFixture.page);

    await securityPage.verifyProtectedPages();
});