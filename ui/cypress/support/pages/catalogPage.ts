import {  COMPUTER_TECHNOLOGY_CATEGORIES } from "../types/types";
import { BasePage } from "./basePage";

export class CatalogPage extends BasePage {

    constructor() {
        super();
        this.url = "/"
    }
   

    public getCategoryByInnerText(category: COMPUTER_TECHNOLOGY_CATEGORIES ) {
        return cy.get("li[class='category__item category__item--lg']").contains(category)
    }

    public clickCategoryByInnerText(category: COMPUTER_TECHNOLOGY_CATEGORIES) {
        this.getCategoryByInnerText(category).click()
    }


}