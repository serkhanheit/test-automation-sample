let LoginPage = require('../pageObjects/login.po.js')
let EmployeesPage = require('../pageObjects/employees.po.js')
let EmployeeEntryPage = require('../pageObjects/employeeEntry.po.js')
var params = browser.params;	        //  see params in conf.[browser].json
const INP_USERNAME = params.userName
const INP_PSWD = params.userPswd
const EXPECT_TITLE = params.title
const tstData = params.tstData
var EC = protractor.ExpectedConditions
var loginPage = new LoginPage()
var employeesPage = new EmployeesPage()
var eEntryPage = new EmployeeEntryPage()

async function hlprCreateEmployee(tst) {

  await employeesPage.clickCreate()  

  //  let tst = tstData[0] 
  await eEntryPage.setFirstName(tst.name)
  await eEntryPage.setLastName(tst.lastname)
  await eEntryPage.setStartDate(tst.startdate)
  await eEntryPage.setEmail(tst.email)

  await eEntryPage.clickAdd()

}

describe('Employees\'s list page::', () => {

  beforeAll( async () => {
  })


  beforeEach( async () => {
    await loginPage.open()
    await browser.waitForAngular()
    return await loginPage.doLogin(INP_USERNAME, INP_PSWD)
  })


  afterEach( async () => {
    return await browser.waitForAngular()
    await loginPage.doLogout()
  })


  describe('Verification of page structure & transitions::', () => {
    it('should have the title "' + EXPECT_TITLE + '"' , async () => {
      let title = await browser.getTitle()
      expect(title).toEqual(EXPECT_TITLE)
    })
    //  it('Edit button should be disabled initially' , async () => {
    //    //  TODO + delete btn, page transitions, nav-back etc..
    //  })
  })


  describe('Verification of CRUD actions::', () => {
    it('should create a tst employee[0] successfully', async () => {

      let eList = employeesPage.getEmployees()
      let cnt0 = await eList.count()

      await hlprCreateEmployee(tstData[0])

      let cnt1 = await eList.count()
      console.log(`(__DBG_::  cnt0 = ${cnt0}  vs  cnt1 = ${cnt1} )`)  

      //  TBD assertion should be revised according to detailed req.s
      expect(cnt1).toEqual(cnt0 + 1)
      //  assertion on cntX works for Create, 

    })

    it('should edit an employee successfully', async () => {
      let eList = employeesPage.getEmployees()
      let cnt0 = await eList.count()

      //  -- select item to be edited
      let employeeToEdit = eList.get(0)
      await employeeToEdit.click()
      await employeesPage.clickEdit()

      var newUrl = await browser.getCurrentUrl()
      console.log(`(___DBG_ _::newUrl = ${newUrl} )`)

      let rdName0 = await eEntryPage.readFirstName()
      console.log(`( __DBG_ _::${rdName0} > rename to > ${rdName0}_1 )`)

      await eEntryPage.editFirstName(`${rdName0}_1`)
      debugger;
      await eEntryPage.doUpdate()

      //  -- check the updated employee for verification
      await employeesPage.clickEdit()
      let rdName1 = await eEntryPage.readFirstName()

      console.log((`( __DBG_ _::${rdName0} > renamed to > ${rdName1} )`))
      debugger;

      //  -- cancel edit go back to employees page
      await eEntryPage.clickBack()

      expect(rdName1).toEqual(rdName0 + '_1', "firstname isn't updated as intented")

      let cnt1 = await employeesPage.getEmployees().count()
      console.log(`(__DBG_::  cnt0 = ${cnt0}  vs  cnt1 = ${cnt1} )`)  

      expect(cnt1).toEqual(cnt0, "unexpected change in count of employees")
    })


    it('should delete an employee successfully', async () => {
      //  store count of employees
      let eList = employeesPage.getEmployees()
      let cnt0 = await eList.count()

      //  -- select item to be deleted
      let employeeToDelete = eList.get(0)
      await employeeToDelete.click()

      //  -- delete the item
      await employeesPage.doDelete()

      let cnt1 = await employeesPage.getEmployees().count()
      console.log(`(__DBG_::  cnt0 = ${cnt0}  vs  cnt1 = ${cnt1} )`)  

      //  -- assert that operation is successful
      expect(cnt1).toBeLessThan(cnt0, 'unexpected change in count of employees')
      //  assertion on cntX works for Create, 
      //  however not ok for Delete by high in difference !!
    })

/*
 * TODO : further tests should be added after design requirements revised: 
  it('should delete an employee in edit page successfully', async () => {
  ..
  })
*/

  })

})
