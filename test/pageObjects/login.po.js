var LoginPage = function() {
	var eUserName = element(by.model('user.name'))
	var eUserPswd = element(by.model('user.password'))
	var eGreetings = element(by.binding('user.name'))
	//  var eGreetings = element(by.id('eGreetings'))
	//  var eGreetings = $('#greetings')
	var eBtnLogin = element(by.buttonText('Login'))
	var eErrorMessage = $('#login-form .error-message')
  var EC = protractor.ExpectedConditions
	var eBtnLogout = element(by.css('[ng-click=\"logout()\"]'))

	this.open = async function() {
		return await browser.get('/')
	}

	this.setName = async function(name) {
		return await eUserName.sendKeys(name)
	}

	this.setPswd = async function(pswd) {
		return await eUserPswd.sendKeys(pswd)
	}

	this.getName = async function() {
		return await eUserName.getAttribute('value')
	}

	this.getPswd = async function() {
		return await eUserPswd.getAttribute('value')
	}

	this.clickLogin = async function() {
		return await eBtnLogin.click()
	}

	this.doLogin = async function (uname, pswd) {
		await this.setName(uname)
		await this.setPswd(pswd)

		return await this.clickLogin()
	}

	this.doLogout = async function () {
		var isLogoutClickable = await EC.elementToBeClickable(eBtnLogout)
		browser.wait(isLogoutClickable, 4000, 'timeout: while waiting for "Logout" is clickable')
			
		return await eBtnLogout.click()
	}

	// Not async, returns the element
	this.getElmGreetings = function() {
		return eGreetings
	}

	this.getElmErrorMessage = function() {
		return eErrorMessage
	}

	this.getElmHeaderContainer = function() {
		return HeaderContainer
	}

	this.getElmBtnLogout = function() {
		return eBtnLogout
	}

	this.getElmBtnLogin = function() {
		return eBtnLogin
	}
}

module.exports = LoginPage
