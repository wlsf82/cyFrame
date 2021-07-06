describe('Settings page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')
    cy.login()
    cy.contains('a', 'Settings').click()
  })

  it('correctly submits a credit card form', () => {
    cy.fillCreditCardForm()

    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })
})
