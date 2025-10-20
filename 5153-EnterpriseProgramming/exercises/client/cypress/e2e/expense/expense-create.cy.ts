describe('Expense - Create', () => {
  it('Visits the /expenses page and creates an expense', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Expenses').click();
    cy.wait(1000);
    cy.contains('control_point').click();
    cy.get('mat-select[formControlName=employeeId]').click().get('mat-option').contains('Sloppy').click();
    cy.get('mat-select[formControlName=categoryId]').click().get('mat-option').contains('Travel').click();
    cy.get('input[formControlName=description').type('OPSEU Convention');
    cy.get('input[formControlName=amount').type('200');
    cy.get('input[formControlName=date').type('10/10/2025');
    cy.get('button').contains('Save').click();
    cy.wait(1000);
    cy.contains('10/10/2025');
  });
});