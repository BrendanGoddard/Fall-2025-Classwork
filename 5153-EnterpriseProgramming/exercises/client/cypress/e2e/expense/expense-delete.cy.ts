describe('Expense - Delete', () => {
  it('Visits the /expenses page and deletes an expense', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Expenses').click();
    cy.wait(1000);
    cy.contains('11/11/2025').click();
    cy.get('button').contains('Delete').click();
    cy.wait(1000);
    cy.contains('11/11/2025').should('not.exist');
  });
});