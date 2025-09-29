describe('Employee - Create', () => {
  it('Visits the /employees page and creates an employee', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Employees').click();
    cy.wait(1000);
    cy.contains('control_point').click();
    cy.get('input[formcontrolname=title').type('Mr.');
    cy.get('input[formcontrolname=firstName').click({ force: true }).type('Testy');
    cy.get('input[formcontrolname=lastName').click({ force: true }).type('Tester');
    cy.get('input[formcontrolname=phone').click({ force: true }).type('(555)555-5555');
    cy.get('input[formcontrolname=email').click({ force: true }).type('tt@email.com');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('Testy');
  });
});