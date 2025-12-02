describe('Purchase Order - Create', () => {
  it('Creates a purchase order using the Generator UI', () => {
    cy.visit('/');

    // Open sidenav → click Generator
    cy.get('button').click();
    cy.contains('a', 'Generator').click();

    cy.wait(500);

    // Select Vendor
    cy.get('mat-select[formControlName=vendorId]')
      .click()
      .get('mat-option')
      .contains('Brendan Goddard')
      .click();

    // Select Product (Graphics Card)
    cy.get('mat-select[formControlName=productId]')
      .click()
      .get('mat-option')
      .contains('Graphics Card')
      .click();

    // Enter Quantity (must NOT be zero)
    cy.get('input[formcontrolname=quantity]')
      .clear()
      .type('1');

    // Update Purchase Order (adds line item)
    cy.contains('button', 'Update Purchase Order').click();

    // Confirm product is now in the table
    cy.contains('Graphics Card');
    cy.contains('1'); // Quantity appears in table

    // Complete Purchase Order
    cy.contains('button', 'Complete Purchase Order').click();

    cy.wait(500);

    // Confirm PO completion (use whatever UI your app shows)
    cy.contains('created').should('exist'); 
    // If your UI shows something else, update this line
  });
});
