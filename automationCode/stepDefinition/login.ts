import {LoginPage} from '../pages/LoginPage'
import {pageFixture} from '../hooks/pageFixture'
import { credentials } from '../testData/test.json'
import {Then,Given} from '@cucumber/cucumber'
let lp:LoginPage
Given('User Launches the Sauce Application',async function(){
    lp = new LoginPage(pageFixture.page);
    await lp.navigateToApplication( credentials.url,credentials.title);
})
Then('I verify the Login Functionality',async function(){
    lp = new LoginPage(pageFixture.page);
    await lp.login(credentials.username,credentials.password);
    console.log("it is logged into the sauce app");
    await lp.verifyDashboardPage();
})
Then('I verify with Invalid Credentials',async function(){
    lp=new LoginPage(pageFixture.page)
    await lp.login(credentials.invalidUsername,credentials.invalidPassword)
    console.log("error message is checking")
    await lp.verifyErrorMessage() 
})