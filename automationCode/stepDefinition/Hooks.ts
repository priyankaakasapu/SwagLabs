import { AfterAll, After, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';
import fs from 'fs';
import path from 'path';

let browser: Browser;
let context: BrowserContext | undefined;
let page: Page | undefined;

const isCI = process.env.CI === 'true';
const traceDir = path.join(process.cwd(), 'reports', 'traces');
const screenshotDir = path.join(process.cwd(), 'test-result', 'ScreenshotsFailed');

const makeDirectory = async (directory: string) => {
  await fs.promises.mkdir(directory, { recursive: true });
};

setDefaultTimeout(60000) // 60 seconds, if any step takes more than 60 seconds, it will be failed due to timeout error

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: isCI,
    args: ['--start-maximized'],
  });

  console.log(`BeforeAll - browser launched headless=${isCI}`);
});

Before(async function () {
  context = await browser.newContext({
    recordVideo: { dir: 'test-result/videos' },
    viewport: null,
  });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  page = await context.newPage();
  pageFixture.page = page;

  console.log('Before - new context and page created');
});

After(async function (scenario) {
  const traceName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const tracePath = path.join(traceDir, `${traceName}.zip`);
  const attachFile = typeof this.attach === 'function' ? this.attach.bind(this) : undefined;

  try {
    if (scenario.result?.status === Status.FAILED && page) {
      try {
        await makeDirectory(screenshotDir);
        const screenshotPath = path.join(screenshotDir, `${traceName}.png`);
        const screenshotBuffer = await page.screenshot({ path: screenshotPath, fullPage: true });

        if (attachFile) {
          await attachFile(screenshotBuffer, 'image/png');
        }
      } catch (error) {
        console.warn('Failed to capture failure screenshot:', error);
      }
    }

    try {
      await makeDirectory(traceDir);
      if (context) {
        await context.tracing.stop({ path: tracePath });
      }
    } catch (error) {
      console.warn('Failed to stop tracing for scenario:', error);
    }
  } finally {
    if (page && !page.isClosed()) {
      try {
        await page.close();
      } catch (error) {
        console.warn('Failed to close page:', error);
      }
    }

    pageFixture.page = undefined as unknown as Page;

    if (context) {
      try {
        await context.close();
      } catch (error) {
        console.warn('Failed to close browser context:', error);
      }
      context = undefined;
    }
  }
});

AfterAll(async function () {
  try {
    if (browser) {
      await browser.close();
    }
  } catch (error) {
    console.error('Failed to close browser in AfterAll:', error);
  }

  console.log('AfterAll - browser closed');
});



