describe('Employee - Update', () => {
  it('Visits the /employees page and deletes an employee', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Employees').click();
    cy.wait(1000);
    cy.contains('Testy').click();
    cy.get('input[formcontrolname=firstName').clear();
    cy.get('input[formcontrolname=firstName').click({ force: true }).type('Testier');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('Testier');
  });
});