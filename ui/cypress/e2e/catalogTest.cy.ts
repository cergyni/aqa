import { CatalogPage } from "../support/pages/catalogPage"
import { GpuPage } from "../support/pages/gpuPage"
import { LaptopPage } from "../support/pages/laptopPage"
import { PageFactory } from "../support/pages/pageFacory"
import { CATALOG_TYPES, COMPUTER_TECHNOLOGY_CATEGORIES, PAGES } from "../support/types/types"

describe("Catalog page test", () => {
    const catalogPage = PageFactory.getPage(PAGES.CATALOG_TYPES) as CatalogPage
    describe(`Check nav menu`, () => {
        beforeEach(() => {
            catalogPage.visitPage()
        })
        it(`Should open ${CATALOG_TYPES.APPLIANCES} page `, () => {
            catalogPage.navigationMenu.clickCatalogItemByInnerText(CATALOG_TYPES.APPLIANCES)
            catalogPage.waitForTitleToIncludeText(CATALOG_TYPES.APPLIANCES)
        })
        it(`Should open ${CATALOG_TYPES.VIDEO_AUDIO} page `, () => {
            catalogPage.navigationMenu.clickCatalogItemByInnerText(CATALOG_TYPES.VIDEO_AUDIO)
            catalogPage.waitForTitleToIncludeText(CATALOG_TYPES.VIDEO_AUDIO)
        })
    })
    describe(`${CATALOG_TYPES.COMP_TECHNIC} page test`, () => {
        beforeEach(() => {
            catalogPage.visitPage()
        })
        it(`Should open ${COMPUTER_TECHNOLOGY_CATEGORIES.LAPTOPS} page `, () => {
            catalogPage.clickCategoryByInnerText(COMPUTER_TECHNOLOGY_CATEGORIES.LAPTOPS)
            const laptop = PageFactory.getPage(PAGES.LAPTOP) as LaptopPage
            laptop.innerTextFromHeadingShouldInclude(COMPUTER_TECHNOLOGY_CATEGORIES.LAPTOPS)
        })
        it(`Should open ${COMPUTER_TECHNOLOGY_CATEGORIES.GPU} page `, () => {
            catalogPage.clickCategoryByInnerText(COMPUTER_TECHNOLOGY_CATEGORIES.GPU)
            const gpuPage = PageFactory.getPage(PAGES.GPU) as GpuPage
            gpuPage.innerTextFromHeadingShouldInclude(COMPUTER_TECHNOLOGY_CATEGORIES.GPU)
        })
    })
})