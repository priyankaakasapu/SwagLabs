import { LoginPage } from '../pages/LoginPage'
import { pageFixture } from '../hooks/pageFixture'
import { credentials, users } from '../testData/test.json'
import { When, Then, Given } from '@cucumber/cucumber'

let lp: LoginPage

type LoginUser = {
    username: string
    password: string
    expectedResult: 'success' | 'locked_out' | 'error'
    errorMessage?: string
}

const getUser = (userKey: string): LoginUser => {
    const user = (users as Record<string, LoginUser>)[userKey]

    if (!user) {
        throw new Error(`Login data not found for user: ${userKey}`)
    }

    return user
}

Given('User Launches the Sauce Application', async function () {
    lp = new LoginPage(pageFixture.page)
    await lp.navigateToApplication(credentials.url, credentials.title)
    await lp.verifyWebElements()
})

When('I login with {string} user', async function (userKey: string) {
    const user = getUser(userKey)
    lp = new LoginPage(pageFixture.page)
    await lp.login(user.username, user.password)
})

Then('I should see the login result for {string}', async function (userKey: string) {
    const user = getUser(userKey)

    if (user.expectedResult === 'success') {
        await lp.verifyDashboardPage()
        return
    }

    const expectedMessage = user.errorMessage ?? credentials.errorMessage
    await lp.verifyErrorMessage(expectedMessage)
})

When('I login with invalid credentials', async function () {
    lp = new LoginPage(pageFixture.page)
    await lp.login(credentials.invalidUsername, credentials.invalidPassword)
})

Then('I should see the invalid login error', async function () {
    await lp.verifyErrorMessage(credentials.errorMessage)
})