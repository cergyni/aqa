import {  CATEGORIES_COMP } from "../types/types";
import { BasePage } from "./basePage";

export class CatalogPage extends BasePage {

    constructor() {
        super();
        this.url = "/"
    }
   

    public getCategoryByInnerText(category: CATEGORIES_COMP ) {
        return cy.get("li[class='category__item category__item--lg']").contains(category)
    }

    public clickCategoryByInnerText(category: CATEGORIES_COMP) {
        this.getCategoryByInnerText(category).click()
    }


}