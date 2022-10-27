export class CategoryMenu {
    constructor() { }
    public getFieldInputFindByName() {
        return cy.get("input[class='f-search__inp']")
    }
    public inputInFieldFindByName(input: string) {
        this.getFieldInputFindByName().click().type(`${input}{enter}`)
    }
    public getinnerTextFromHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[class='heading']")
    }
}