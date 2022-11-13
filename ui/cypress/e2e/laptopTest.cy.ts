
import { LaptopPage } from "../support/pages/laptopPage"
import { PageFactory } from "../support/pages/pageFacory"
import { HARD_DRIVE_TYPE, PAGES } from "../support/types/types"

describe("Laptop page test", () => {
    const laptopPage = PageFactory.getPage(PAGES.LAPTOP) as LaptopPage
    beforeEach(() => {
        laptopPage.visitPage()
    })
    it(`Should show only laptops with ${HARD_DRIVE_TYPE.HDD}`, () => {
        laptopPage.clickOnHardDriveButtonByInnerText(HARD_DRIVE_TYPE.HDD)
        laptopPage.checkIfFilterImplemented(HARD_DRIVE_TYPE.HDD)
    })
    it(`Should show only laptops with ${HARD_DRIVE_TYPE.SSD_PLUS_HDD}`, () => {
        laptopPage.clickOnHardDriveButtonByInnerText(HARD_DRIVE_TYPE.SSD_PLUS_HDD)
        laptopPage.checkIfFilterImplemented(HARD_DRIVE_TYPE.SSD_PLUS_HDD)
    })
})