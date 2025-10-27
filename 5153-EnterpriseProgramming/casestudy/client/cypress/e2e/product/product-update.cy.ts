describe('Product - Update', () => {
  it('Visits the /products page and updates a product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.wait(1000);
    cy.contains('Testy').click();
    cy.get('input[formControlName=name').clear();
    cy.get('input[formControlName=name').click().type('Testier Product');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('Testier');
  });
});