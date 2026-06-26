import { BeforeAll, AfterAll, After, Before, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { pageFixture } from "../hooks/pageFixture";
import path from 'path';

let page: Page;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60000) // 60 seconds, if any step takes more than 60 seconds, it will be failed due to timeout error

BeforeAll(async function () {

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    console.log("BeforeAll")

});

Before(async function () {

    context = await browser.newContext({
        recordVideo: { dir: 'test-result/videos' },
        viewport: null
    });

    // 3. Start tracing before navigating or creating a page
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    page = await context.newPage();

    pageFixture.page = page

    console.log("Before")
});


// After(async function ({ pickle, result }) {

//     if (result?.status === Status.FAILED) {
//         // Screenshots are saved in the directory after the test is completed for each scenario
//         const img = await pageFixture.page.screenshot({ path: `./test-result/ScreenshotsFailed/${pickle.name}.png` });

//         await this.attach(img, 'image/png');

//         // Attach video on failure (if enabled in Playwright config)
//         const videoPath = await page.video()?.path();

//         if (videoPath) {
//             this.attach(videoPath, 'video/webm');
//         }
//     }
//     else if (result?.status === Status.PASSED) {
//         const img = await pageFixture.page.screenshot({ path: `./test-result/ScreenshotsPassed/${pickle.name}.png` });

//         await this.attach(img, 'imagepasssed/png');

//         const videoPath = await page.video()?.path();

//         if (videoPath) {
//             this.attach(videoPath, 'video/webm');
//         }
//     }
//     console.log("after")
// });


After(async function (scenario) {
    // Sanitize scenario name to use as a filename
    const traceName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const tracePath = path.join(process.cwd(), `reports/traces/${traceName}.zip`);

    // 5. Close the page
    await pageFixture.page.close();

    // 6. Stop tracing and save the file
    // Tip: You can wrap this in an if condition to save only on failure
    await context.tracing.stop({ path: tracePath });

    // 7. Clean up the context and browser
    // await context.close();
    // await browser.close();
});

AfterAll(async function () {

    //close the page
    //await pageFixture.page.close();

    //browser.close/context.close 

    //await context.close()

    console.log("afterAll")

    console.log("==============================")
});


Then('i close the browser in hooks', async function () {

    //await browser.close()
});


Then('I launch the test automation practice application in hooks', async function () {

    await pageFixture.page.goto('https://testautomationpractice.blogspot.com/')

    //         await pageFixture.page.getByPlaceholder('Enter Name').fill("Name")

    //   await pageFixture.page.getByPlaceholder('Enter EMail').fill("Email")

    //   await pageFixture.page.getByRole('textbox', { name: 'Phone' }).fill("Phone")

    //   await pageFixture.page.locator('//textarea[@id="textarea"]').fill("Address")

    //   await pageFixture.page.locator('.wikipedia-search-input').fill("Wikipedia")

    //   await pageFixture.page.waitForTimeout(1000)

});

Then('I am reading the testdata from the feature file in hooks', async function () {

    await pageFixture.page.getByPlaceholder('Enter Name').fill("Name")

    await pageFixture.page.getByPlaceholder('Enter EMail').fill("Email")

    await pageFixture.page.getByRole('textbox', { name: 'Phone' }).fill("Phone")

    await pageFixture.page.locator('//textarea[@id="textarea"]').fill("Address")

    await pageFixture.page.locator('.wikipedia-search-input').fill("Wikipedia")

    await pageFixture.page.waitForTimeout(1000)
});


Then('I am reading the OrangeHRMtestdata from the feature file', async function () {

    await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    await pageFixture.page.locator("//input[@name='username']").fill("venkat")

    await pageFixture.page.locator("//input[@name='password']").fill("admin123")

    await pageFixture.page.locator("//button[@type='submit']").click()

    await pageFixture.page.waitForTimeout(3000)

    await pageFixture.page.locator("//*[text()='Admin']").click()

});

Then('I launch the test automation practiceapplication1', async function () {

    await pageFixture.page.goto("https://testautomationpractice.blogspot.com/")

});



