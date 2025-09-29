describe('Employee - Page Load', () => {
  it('Visits the /employees page and finds the developer\'s last name', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Employees').click();
    cy.contains('Goddard');
  });
});