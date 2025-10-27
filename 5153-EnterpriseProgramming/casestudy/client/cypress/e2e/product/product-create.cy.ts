describe('Product - Create', () => {
  it('Visits the /products page and creates a product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Products').click();
    cy.wait(1000);
    cy.contains('control_point').click();
    cy.get('input[formControlName=id').click().type('TP-01');
    cy.get('mat-select[formControlName=vendorId]').click().get('mat-option').contains('ABC').click();
    cy.get('input[formControlName=name').click().type('Testy Product');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('Testy');
  });
});