export class CategoryMenu {
    constructor() { }
    public getFindByNameInputField() {
        return cy.get("input[class='f-search__inp']")
    }
    public inputInFindByNameField(input: string) {
        this.getFindByNameInputField().click().type(`${input}{enter}`)
    }
    public getInnerTextFromHeading(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get("div[class='heading']")
    }
}