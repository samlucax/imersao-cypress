declare namespace Cypress {
  interface Chainable {

    /**
     * @example cy.login()
     */
    login(): void

    /**
     * @example cy.token()
     */

    token(): Cypress.Chainable<Cypress.Response>

  }
}