describe('Vendor - Delete', () => {
  it('Visits the /vendors page and deletes an vendor', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Vendors').click();
    cy.wait(1000);
    cy.contains('Tester').click();
    cy.get('button').contains('Delete').click();
    cy.wait(1000);
    cy.contains('Tester').should('not.exist');
  });
});