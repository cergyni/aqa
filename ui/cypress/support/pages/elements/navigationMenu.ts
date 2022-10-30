import { CATALOG_TYPES } from "../../types/types"

export class NavigationMenu {
    constructor() { }
    public getCatalogItemByInnerText(itemText: CATALOG_TYPES) {
        return cy.get("a[class='menu__cat-item']").contains(itemText)
    }
    public clickCatalogItemByInnerText(itemText: CATALOG_TYPES) {
        cy.get("div[class='menu__link menu__catalog']").click()
        this.getCatalogItemByInnerText(itemText).click()
    }

}