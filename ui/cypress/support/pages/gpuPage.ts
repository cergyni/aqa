import { isBuffer } from "cypress/types/lodash";
import { NO_PRODUCT_MESSAGE_TEXT, reqExpMemorySize } from "../constants/constants";
import {  CATEGORIES_COMP, INNER_TEXT_IN_SPAN_BUTTON, INPUT_MEMORY_SIZE_GPU, INPUT_NAME_GPU, PARTS_URL_CATEGORY } from "../types/types";
import { CatalogPage } from "./catalogPage";
import { CategoryMenu } from "./elements/categoryMenu";

export class GpuPage extends CatalogPage {
    public categoryMenu: CategoryMenu
    constructor() {
        super();
        this.categoryMenu = new CategoryMenu()
        this.url = PARTS_URL_CATEGORY.GPU
    }


    public innerTextFromHeadingShouldInclude(titleText: CATEGORIES_COMP) {
        this.categoryMenu.getinnerTextFromHeading().then($el => {
            cy.wrap($el.text()).should("include", titleText)
        })
    }

    public getProductNameFromAds(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("span[class='prod-tv__name']")
    }

    public compareEnteredNameWithNameOfAdds(enteredName: INPUT_NAME_GPU) {
        this.getProductNameFromAds()
            .each($el => {
                cy.wrap($el.text().toLowerCase()).should("include", enteredName.toLowerCase())
            })
    }

    public getElementContainsMessageAboutNotExistProduct(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[class='prod_no-result']")
    }

    public checkTextMessage() {
        this.getElementContainsMessageAboutNotExistProduct().should('have.text', NO_PRODUCT_MESSAGE_TEXT)
    }

    public clickOnSpanButtonByInnerText(textOfButton: INNER_TEXT_IN_SPAN_BUTTON) {
        cy.get("span[class='btn__text']").contains(textOfButton).click()
    }

    public getFieldMemorySize(isFisrt: boolean): Cypress.Chainable<JQuery<HTMLElement>> {
        return isFisrt ? cy.get("select[class='f-reach__inp']").first() : cy.get("select[class='f-reach__inp']").eq(1)
    }

    public chooseMemorySizeFrom(size: INPUT_MEMORY_SIZE_GPU) {
        this.getFieldMemorySize(true).select(size)
        this.clickOnSpanButtonByInnerText(INNER_TEXT_IN_SPAN_BUTTON.SHOW)
    }
    public chooseMemorySizeBefore(size: INPUT_MEMORY_SIZE_GPU) {
        this.getFieldMemorySize(false).select(size)
        this.clickOnSpanButtonByInnerText(INNER_TEXT_IN_SPAN_BUTTON.SHOW)
    }

    public getDescriptionFromAds(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[class='prod-line__descr']")
    }

    public compareMemorySizeFromDescriptionWithEnteredValue(size: INPUT_MEMORY_SIZE_GPU, isFrom: boolean) {
        const arrayMemorySizes: Array<number> = [];
        this.getDescriptionFromAds()
            .each($el => {
                arrayMemorySizes.push(+($el.text()
                    .slice($el.text().indexOf('память'), $el.text().indexOf('Мб'))
                    .split(' ')
                    .filter(el => reqExpMemorySize.test(el))[0]))
            })
            .then(() => {
                expect(arrayMemorySizes.every(el => {
                   return isFrom? el >= +size : el <= +size
                })).to.be.true
            })
    }
}