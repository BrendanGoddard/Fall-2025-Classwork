describe('Purchase Order - View Purchase Order', () => {
  it('Finds and views a purchase order in the Viewer', () => {
    cy.visit('/');

    // Open sidenav and go to Viewer
    cy.get('button').click();
    cy.contains('a', 'Viewer').click();

    cy.wait(500);

    //
    // SELECT VENDOR
    //
    cy.get('mat-select[formControlName=vendorId]').click();

    // Select using the overlay text — no mat-option selector needed
    cy.contains('Goddard').click();

    cy.wait(300);

    //
    // SELECT PURCHASE ORDER
    //
    cy.get('mat-select[formControlName=purchaseOrderId]').click();

    // Select last PO in dropdown — again, no mat-option selector
    cy.contains('[#1]')
      .last()
      .click();

    //
    // VERIFY UI CONTENT
    //
    cy.contains('Graphics Card');   // Product name  
    cy.contains('Purchase Order #'); // Header  
    cy.contains('$450.00');         // Price displayed  
  });
});
