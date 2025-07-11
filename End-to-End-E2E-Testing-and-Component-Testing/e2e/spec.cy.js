describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://demowebshop.tricentis.com/')
    cy.get('.lnXdpd').should('be.visible')
  })
})
