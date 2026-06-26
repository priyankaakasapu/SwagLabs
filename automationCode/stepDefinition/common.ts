import { Given } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { pageFixture } from "../hooks/pageFixture";
import { credentials } from "../testData/test.json";

let lp: LoginPage;

Given('User Launches the Application', async function () {
    lp = new LoginPage(pageFixture.page);

    await lp.navigateToApplication( credentials.url,credentials.title);

    await lp.login(credentials.username,credentials.password);

    console.log("it is logged into the app");

    await lp.verifyDashboardPage();
});