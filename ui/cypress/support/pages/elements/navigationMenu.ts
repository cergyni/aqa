import { CATALOG } from "../../types/types"

export class NavigationMenu {
    constructor() { }
    public getCatalogItemByInnerText(itemText: CATALOG) {
        return cy.get("a[class='menu__cat-item']").contains(itemText)
    }
    public clickCatalogItemByInnerText(itemText: CATALOG) {
        cy.get("div[class='menu__link menu__catalog']").click()
        this.getCatalogItemByInnerText(itemText).click()
    }

}