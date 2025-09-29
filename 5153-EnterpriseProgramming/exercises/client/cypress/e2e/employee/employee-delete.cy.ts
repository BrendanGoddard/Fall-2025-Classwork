describe('Employee - Delete', () => {
  it('Visits the /employees page and deletes an employee', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Employees').click();
    cy.wait(1000);
    cy.contains('Tester').click();
    cy.get('button').contains('Delete').click();
    cy.wait(1000);
    cy.contains('Tester').should('not.exist');
  });
});