import { test, expect } from "@playwright/test"

test("Adding One Employee", async ({ page }) => {

    await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php");
    await page.locator("//input[@name= 'txtUserName']").fill('selenium');
    await page.locator("//input[@name= 'txtPassword']").fill('selenium');
    await page.locator("//input[@name= 'Submit']").click();

    await page.waitForTimeout(2000);

    await page.locator("//li[@id='pim']").hover();
    await page.waitForTimeout(2000);
    await page.locator("//span[text() = 'Add Employee']").click();

    const F = page.frameLocator("//iframe[@id = 'rightMenu']");
    await page.waitForTimeout(2000);
    await F.locator("//input[@name= 'txtEmployeeId']").clear();
    await page.waitForTimeout(2000);
    await F.locator("//input[@name= 'txtEmployeeId']").fill('0014');
    await page.waitForTimeout(3000);
    await F.locator("//input[@name= 'txtEmpLastName']").fill('Seelaboina');
    await page.waitForTimeout(3000);
    await F.locator("//input[@name= 'txtEmpFirstName']").fill('Niranjan');
    await page.waitForTimeout(3000);
    await F.locator("//input[@name= 'txtEmpMiddleName']").fill('Kumar');
    await page.waitForTimeout(3000);
    await F.locator("//input[@name= 'photofile']").setInputFiles("C:/Users/NSeelaboina/Downloads/image.png");
    await page.waitForTimeout(3000);
    await F.locator("//input[@name= 'txtEmpNickName']").fill('Nani');
    await page.waitForTimeout(3000);
    await F.locator("//input[@class= 'savebutton']").click();  



})