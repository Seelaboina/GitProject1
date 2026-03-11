import { test, expect } from '@playwright/test'
const myexcel = require('xlsx')

test.describe("Test scenario - adding multiple Employees ", () => {
    let page;
    let context;

    function readExcel(filepath, sheetName) {
        const wb = myexcel.readFile(filepath);
        const sht = wb.Sheets[sheetName];
        const data = myexcel.utils.sheet_to_json(sht, { header: 1 });
        return data;
    }

    test.beforeAll("Lanching the Application", async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php");
        console.log("----------Applicaton Lanch successfuly----------");
    })

    test("Application Login form ", async ({ }) => {

        const logindata = readExcel("C:/Users/NSeelaboina/Music/BasicPW/DDFrameWork/MyData/PlaywrightData.xlsx", "LogIn_page");

        await page.locator("//input[@name= 'txtUserName']").fill(logindata[1][0]);
        await page.locator("//input[@name= 'txtPassword']").fill(logindata[1][1]);
        await page.locator("//input[@name= 'Submit']").click();
        console.log("----------Applicaton Login successfuly----------");
    })

    test("Adding Multipule employee details", async () => {

        const empdata = readExcel("C:/Users/NSeelaboina/Music/BasicPW/DDFrameWork/MyData/PlaywrightData.xlsx", "Emp_Data");
        console.log("The number of employees data sheet is :" + empdata.length);
        await page.locator("//li[@id='pim']").hover();
        await page.waitForTimeout(1000);
        await page.locator("//span[text() = 'Add Employee']").click();

        const F = page.frameLocator("//iframe[@id = 'rightMenu']");
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmployeeId']").clear();
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmployeeId']").fill(empdata[1][0].toString());
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmpLastName']").fill(empdata[1][2]);
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmpFirstName']").fill(empdata[1][1]);
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmpMiddleName']").fill(empdata[1][3]);
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'photofile']").setInputFiles("C:/Users/NSeelaboina/Downloads/image.png");
        await page.waitForTimeout(1000);
        await F.locator("//input[@name= 'txtEmpNickName']").fill(empdata[1][4]);
        await page.waitForTimeout(1000);
        await F.locator("//input[@id='btnEdit']").click();
        await page.waitForTimeout(3000);
        console.log("----------Added Employees deatils successfuly----------");
    })



    test.afterAll("Closing the application", async () => {
        await page.waitForTimeout(3000);
        await context.close();
        console.log("Successfully closed the application");
    })

})