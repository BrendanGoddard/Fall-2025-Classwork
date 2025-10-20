describe('Expense - Page Load', () => {
  it('Visits the /expenses page and finds the developer\'s last name', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Expenses').click();
    cy.contains('Goddard');
  });
});