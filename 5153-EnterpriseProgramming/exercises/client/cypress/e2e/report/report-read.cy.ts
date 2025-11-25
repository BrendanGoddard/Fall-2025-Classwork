describe('Report - View Report', () => {
  it('Visits the /viewer page and finds a report', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'Viewer').click();
    cy.wait(1000);
    cy.get('mat-select[formControlName=employee]').click().get('mat-option').contains('Goddard').click();
    cy.get('mat-select[formControlName=report]').click().get('mat-option').last().click();
    cy.contains('Bus to Fanshawe');
  });
});