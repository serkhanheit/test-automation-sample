var EmployeesPage = function() {
  var eBtnCreate = element(by.id('bAdd'))
  var eBtnEdit = element(by.id('bEdit'))
  var eBtnDelete = element(by.id('bDelete'))
  var employees = element.all(by.repeater('employee in employees'))
  var eEmployeeUList = element(by.id('employee-list'))  //  ul

  this.clickCreate = async function() {
    return await eBtnCreate.click()
  }

  this.clickDelete = async function() {
    return await eBtnDelete.click()
  }

  this.clickEdit = async function() {
    return await eBtnEdit.click()
  }

  this.doDelete = async function() {
    await this.clickDelete()
    return browser.switchTo().alert().then(function (alert) {
      return alert.accept()
    })
  }

  this.getEmployees = function(name) {
    return employees
  }

  this.getElmEmployeesUL = function(name) {
    return eEmployeeUList
  }

  this.getElmBtnCreate = function(name) {
    return eBtnCreate
  }

  this.getElmBtnEdit = function(name) {
    return eBtnEdit
  }

  this.getElmBtnDelete = function(name) {
    return eBtnDelete
  }
}

module.exports = EmployeesPage
