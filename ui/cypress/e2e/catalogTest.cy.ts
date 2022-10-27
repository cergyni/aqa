import { CatalogPage } from "../support/pages/catalogPage"
import { GpuPage } from "../support/pages/gpuPage"
import { LaptopPage } from "../support/pages/laptopPage"
import { PageFactory } from "../support/pages/pageFacory"
import { CATALOG, CATEGORIES_COMP, PAGES } from "../support/types/types"

describe("Catalog page test", () => {
    const catalog = PageFactory.getPage(PAGES.CATALOG) as CatalogPage
    describe(`Check nav menu`, () => {
        beforeEach(() => {
            catalog.visitPage()
        })
        it(`Should open ${CATALOG.APPLIANCES} page `, () => {
            catalog.navigationMenu.clickCatalogItemByInnerText(CATALOG.APPLIANCES)
            catalog.waitForTitleToIncludeText(CATALOG.APPLIANCES)
        })
        it(`Should open ${CATALOG.VIDEO_AUDIO} page `, () => {
            catalog.navigationMenu.clickCatalogItemByInnerText(CATALOG.VIDEO_AUDIO)
            catalog.waitForTitleToIncludeText(CATALOG.VIDEO_AUDIO)
        })
    })
    describe(`${CATALOG.COMP_TECHNIC} page test`, () => {
        beforeEach(() => {
            catalog.visitPage()
        })
        it(`Should open ${CATEGORIES_COMP.LAPTOPS} page `, () => {
            catalog.clickCategoryByInnerText(CATEGORIES_COMP.LAPTOPS)
            const laptop = PageFactory.getPage(PAGES.LAPTOP) as LaptopPage
            laptop.innerTextFromHeadingShouldInclude(CATEGORIES_COMP.LAPTOPS)
        })
        it(`Should open ${CATEGORIES_COMP.GPU} page `, () => {
            catalog.clickCategoryByInnerText(CATEGORIES_COMP.GPU)
            const gpu = PageFactory.getPage(PAGES.GPU) as GpuPage
            gpu.innerTextFromHeadingShouldInclude(CATEGORIES_COMP.GPU)
        })
    })
})