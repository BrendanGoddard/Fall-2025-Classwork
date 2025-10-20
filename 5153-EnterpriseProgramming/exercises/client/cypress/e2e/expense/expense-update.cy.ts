describe('Expense - Update', () => {
  it('Visits the /expenses page and updates an expenses', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Expenses').click();
    cy.wait(1000);
    cy.contains('10/10/2025').click();
    cy.get('input[formControlName=date').clear();
    cy.get('input[formControlName=date').type('11/11/2025');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('11/11/2025');
  });
});