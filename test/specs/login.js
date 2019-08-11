let LoginPage = require('../pageObjects/login.po.js')
var loginPage = new LoginPage()
var params = browser.params;
const INP_USERNAME = params.userName
const INP_PSWD = params.userPswd
const EXPECT_TITLE = 'CafeTownsend-AngularJS-Rails'
const EXPECT_GREETINGS_PFX = 'Hello ' 
const EXPECT_ERROR_MSG01_LOGIN = 'Invalid username or password!'
let nameToGreet
var EC = protractor.ExpectedConditions
const EXPECT_URL_EMPLOYEES = browser.baseUrl + '/employees'


describe('Login page::', () => {

  beforeAll( async () => {
  })


  beforeEach( async () => {
    await loginPage.open()
    return await browser.waitForAngular() 
  })


  afterEach( async () => {
    return await browser.waitForAngular()
  })

  it('should have the title "' + EXPECT_TITLE + '"' , async () => {
    let title = await browser.getTitle()
    expect(title).toEqual(EXPECT_TITLE)
  })


  it('successful login is signified with a visible greeting message', async () => {
    await loginPage.doLogin(INP_USERNAME, INP_PSWD)

    let eGreetings = loginPage.getElmGreetings()
    await browser.wait(await EC.visibilityOf(eGreetings), 20, 'timeout: while waiting for "greetings"')
    
    let greetingsTxt = await eGreetings.getText()
    expect(greetingsTxt).toEqual(EXPECT_GREETINGS_PFX + INP_USERNAME)

    await loginPage.doLogout()
  })


  it('should signify successful login by showing employees page next', async () => {
    debugger
    await loginPage.doLogin(INP_USERNAME, INP_PSWD)

    var eBtnLogout = loginPage.getElmBtnLogout()
    expect(await eBtnLogout.getText()).toEqual('Logout');

    var newUrl = await browser.getCurrentUrl()
    expect(newUrl).toEqual(EXPECT_URL_EMPLOYEES)

    await loginPage.doLogout()
  })


  it('should signify unsuccessful login attempt with a visible error message', async () => {
    let incorrectPswd = INP_PSWD + (Math.random()*2).toFixed(2)
    await loginPage.doLogin(INP_USERNAME, incorrectPswd) 

    let eGreetings = loginPage.getElmGreetings()
    let eErrorMessage = loginPage.getElmErrorMessage()
    let condition = await EC.visibilityOf(eErrorMessage)

    await browser.wait(condition, 4000, 'timeout: while waiting for expected "Error Message"')

    let errorMessageTxt = await eErrorMessage.getText()

    expect(errorMessageTxt).toEqual(EXPECT_ERROR_MSG01_LOGIN)
  })


  it('should have the "password" and "username" fields in compatible state after logout', async () => {
    await loginPage.doLogin(INP_USERNAME, INP_PSWD)

    let eGreetings = loginPage.getElmGreetings()
    let greetingsTxt = await eGreetings.getText()
    expect(greetingsTxt).toEqual(EXPECT_GREETINGS_PFX + INP_USERNAME)

    await loginPage.doLogout()

    var eBtnLogin = loginPage.getElmBtnLogin()
    let condition = await EC.visibilityOf(eBtnLogin)
    await browser.wait(condition, 4000, 'timeout: while waiting for back to "Login" screen')

    let currentName = await loginPage.getName()
    let currentPswd = await loginPage.getPswd()
    let expectedPswd = (currentName == '') ? '' : currentPswd 
    expect(currentPswd).toEqual(expectedPswd)
  })

})
