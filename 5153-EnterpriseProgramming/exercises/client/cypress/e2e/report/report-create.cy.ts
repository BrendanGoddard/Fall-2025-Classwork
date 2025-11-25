describe('Report - Create', () => {
  it('Visits the /generator page and creates a report', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Generator').click();
    cy.wait(1000);
    cy.get('mat-select[formControlName=employeeId]').click().get('mat-option').contains('Goddard').click();
    cy.get('mat-select[formControlName=expenseId]').click().get('mat-option').contains('Bus to Fanshawe').click();
    cy.get('button').contains('Add').click();
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('created');
  });
});