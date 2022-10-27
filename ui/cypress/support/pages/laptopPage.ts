import { HARD_DRIVE_TYPE, INNER_TEXT_IN_SPAN_BUTTON, PARTS_URL_CATEGORY } from "../types/types";
import { CategoryMenu } from "./elements/categoryMenu";
import { GpuPage } from "./gpuPage";

export class LaptopPage extends GpuPage {
    public categoryMenu: CategoryMenu
    constructor() {
        super();
        this.categoryMenu = new CategoryMenu()
        this.url = PARTS_URL_CATEGORY.LAPTOPS
    }

    public getButtonTypeHardDriveByInnerText(type: HARD_DRIVE_TYPE) {
        return cy.get("div[class='f-checkers']").contains(type)
    }

    public clickButtonTypeHardDriveByInnerText(type: HARD_DRIVE_TYPE) {
        this.getButtonTypeHardDriveByInnerText(type).click()
        this.clickOnSpanButtonByInnerText(INNER_TEXT_IN_SPAN_BUTTON.SHOW)
    }

    public getImplementFilterValue() {
        return cy.get("button[class='tags__it']")
    }
    public checkIsFilterImplement(type: HARD_DRIVE_TYPE) {
        this.getImplementFilterValue().should('have.text', type)
    }
}