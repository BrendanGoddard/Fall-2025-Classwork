describe('Product - Page Load', () => {
  it('Visits the /products page and finds the developer\'s last name', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.contains('Goddard');
  });
});