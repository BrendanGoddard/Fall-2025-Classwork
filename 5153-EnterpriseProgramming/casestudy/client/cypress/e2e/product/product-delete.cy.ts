describe('Product - Delete', () => {
  it('Visits the /products page and deletes a product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.wait(1000);
    cy.contains('Testier').click();
    cy.get('button').contains('Delete').click();
    cy.wait(1000);
    cy.contains('Testier').should('not.exist');
  });
});