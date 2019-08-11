var EmployeeEntryPage = function() {
  var eInpFirstName = element(by.model('selectedEmployee.firstName'))
  var eInpLastName = element(by.model('selectedEmployee.lastName'))
  var eInpStartDate = element(by.model('selectedEmployee.startDate'))
  var eInpEmail = element(by.model('selectedEmployee.email'))
  var eBtnAdd = element(by.buttonText('Add'))
  var eBtnUpdate = element(by.buttonText('Update'))
  var eBtnBack = element(by.className('subButton bBack'))
  //  var eBtnBack = element(by.className('bBack'))
  var EC = protractor.ExpectedConditions

  this.setFirstName = async function(firstname) {
    return await eInpFirstName.sendKeys(firstname)
  }

  this.editFirstName = async function(newFirstname) {
    return await eInpFirstName.sendKeys(
      protractor.Key.CONTROL, "a", protractor.Key.NULL, newFirstname)
  }

  this.setLastName = async function(lastname) {
    return await eInpLastName.sendKeys(lastname)
  }

  this.setStartDate = async function(startdate) {
    return await eInpStartDate.sendKeys(startdate)
  }

  this.setEmail = async function(email) {
    return await eInpEmail.sendKeys(email)
  }

  this.clickAdd = async function() {
    return await eBtnAdd.click()
  }

  this.clickBack = async function() {
    return await this.getElmBtnBack().click()
  }

  this.clickEdit = async function() {
    return await eBtnUpdate.click()
  }

  this.getElmInpFirstName = function() {
    return eInpFirstName
  }

  this.getElmBtnBack = function() {
    return eBtnBack
  }

  this.readFirstName = async function() {
		var isVisibleFirstName = await EC.visibilityOf(eInpFirstName)
    await browser.wait(isVisibleFirstName, 4000, 'timeout: while waiting for visibility of firstName box')

    return await this.getElmInpFirstName().getAttribute('value')
  }

  this.doUpdate = async function() {
    await this.clickEdit()
    //  return await browser.switchTo().alert().accept()
    var alert = await browser.driver.switchTo().alert()
      .catch(e => console.log('caught: alertBox skip'));
    return alert

  }
}

module.exports = EmployeeEntryPage
