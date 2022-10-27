
import { LaptopPage } from "../support/pages/laptopPage"
import { PageFactory } from "../support/pages/pageFacory"
import { HARD_DRIVE_TYPE, PAGES } from "../support/types/types"

describe("Laptop page test", () => {
    const laptop = PageFactory.getPage(PAGES.LAPTOP) as LaptopPage
    beforeEach(() => {
        laptop.visitPage()
    })
    it(`Should show only laptops with ${HARD_DRIVE_TYPE.HDD}`, () => {
        laptop.clickButtonTypeHardDriveByInnerText(HARD_DRIVE_TYPE.HDD)
        laptop.checkIsFilterImplement(HARD_DRIVE_TYPE.HDD)
    })
    it(`Should show only laptops with ${HARD_DRIVE_TYPE.SSD_PLUS_HDD}`, () => {
        laptop.clickButtonTypeHardDriveByInnerText(HARD_DRIVE_TYPE.SSD_PLUS_HDD)
        laptop.checkIsFilterImplement(HARD_DRIVE_TYPE.SSD_PLUS_HDD)
    })
})