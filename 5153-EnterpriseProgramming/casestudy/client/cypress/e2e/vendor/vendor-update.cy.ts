describe('Vendor - Update', () => {
  it('Visits the /vendors page and updates an vendor', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Vendors').click();
    cy.wait(1000);
    cy.contains('Testy').click();
    cy.get('input[formcontrolname=name').clear();
    cy.get('input[formcontrolname=name').click({ force: true }).type('Testier Tester');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('Testier');
  });
});