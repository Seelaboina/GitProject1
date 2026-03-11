import { test, expect } from '@playwright/test';
let myexcel = require('xlsx');
import fsdata from 'fs'; //json readind
import { json } from 'stream/consumers';

const jsondata = JSON.parse(fsdata.readFileSync('./MyData/XPathData.json', 'utf-8'));
test.setTimeout(180000);


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

        context = await browser.newContext(
            {
                recordVideo: {
                    dir: './MyVideo/',
                    size: { width: 1280, height: 720 }
                }
            });
        page = await context.newPage();
        await page.goto("http://127.0.0.1/orangehrm-2.5.0.2/login.php");
        console.log("----------Applicaton Lanch successfuly----------");

    })

    test("Application Login form ", async () => {

        //json file configure 

        const logindata = readExcel("C:/Users/NSeelaboina/Music/BasicPW/DDFrameWork/MyData/PlaywrightData.xlsx", "LogIn_page");

        await page.locator(jsondata.XUN).fill(logindata[1][0]);
        await page.locator(jsondata.XPWD).fill(logindata[1][1]);
        await page.locator(jsondata.XSUB).click();
        console.log("----------Applicaton Login successfuly----------");

    })

    test("Adding Multipule employee details", async () => {

        const empdata = readExcel("C:/Users/NSeelaboina/Music/BasicPW/DDFrameWork/MyData/PlaywrightData.xlsx", "Emp_Data");
        console.log("The number of employees data sheet is :" + empdata.length);
        const F = page.frameLocator(jsondata.XFRAM);
        for (let r = 1; r < empdata.length; r++) {

            await page.locator(jsondata.XPIM).hover();
            // await page.waitForTimeout(3000);
            await page.locator(jsondata.XEMPADD).click();
            //await page.waitForTimeout(2000);

            await page.waitForTimeout(2000);
            await F.locator(jsondata.XID).clear();
            await page.waitForTimeout(2000);
            await F.locator(jsondata.XID).fill(empdata[r][0].toString());
            await page.waitForTimeout(2000);

            await F.locator(jsondata.XFN).fill(empdata[r][1]);
            // await page.waitForTimeout(2000);
            await F.locator(jsondata.XLN).fill(empdata[r][2]);
            await F.locator(jsondata.XMN).fill(empdata[r][3]);
            // await page.waitForTimeout(2000);
            await F.locator(jsondata.XNK).fill(empdata[r][4]);
            // await page.waitForTimeout(2000);
            // await F.locator(jsondata.XPIC).setInputFiles("./EmpPhotos/" + empdata[r][1] + ".png");
            // await page.waitForTimeout(2000);
            // await page.screenshot({ path: "./MyScreenShots/" + empdata[r][1] + "_BeforeSave.jpg" });
            // await page.waitForTimeout(2000);
            await F.locator(jsondata.XSAVE).click();

            await page.waitForTimeout(2000);
            await page.screenshot({ path: "./MyScreenShots/" + empdata[r][1] + "_AfterSave.jpg" });
            await page.waitForTimeout(3000);
            await F.locator(jsondata.XBACK).click();
            console.log("Employee " + empdata[r][1] + "  Successfully added");
            await page.screenshot({ path: "./MyScreenShots/" + empdata[r][1] + "_AfterADD.jpg" });

            await F.locator(jsondata.XCHK).check();
            await page.waitForTimeout(2000);
            await F.locator(jsondata.XDEL).click();
        }
    })


    test.afterAll("Closing the application", async () => {
        await page.waitForTimeout(2000);
        await context.close();
        console.log("Successfully closed the application");
    })
    console.log("--------------Successfully added------------");

})