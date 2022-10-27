import { NavigationMenu } from "./elements/navigationMenu";

export class BasePage {
    protected url!: string;
    public navigationMenu: NavigationMenu
    constructor() {
        this.navigationMenu = new NavigationMenu()
    }
    public getPageTitle() {
        return cy.title()
    }

    public visitPage() {
        cy.viewport(1920, 1080)        
        cy.visit(this.url)
    }
    public waitForTitleToIncludeText(titleText: string) {
        this.getPageTitle().should("include", titleText)
    }
}