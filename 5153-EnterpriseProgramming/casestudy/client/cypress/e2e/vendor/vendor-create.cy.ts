describe('Vendor - Create', () => {
    it('Visits the /vendors page and creates an vendor', () => {
        cy.visit('/');
        cy.get('button').click();
        cy.contains('a', 'Vendors').click();
        cy.wait(1000);
        cy.contains('control_point').click();
        cy.get('input[formcontrolname=name').click({ force: true }).type('Testy Tester');
        cy.get('input[formcontrolname=address').click({ force: true }).type('123 Testing Street');
        cy.get('input[formcontrolname=city').click({ force: true }).type('London');
        cy.get('mat-select[formcontrolname=province').click();
        cy.get('mat-option').contains('ON').click();
        cy.get('input[formcontrolname=postalCode').click({ force: true }).type('A1A 1A1');
        cy.get('input[formcontrolname=phone').click({ force: true }).type('(555)555-5555');
        cy.get('mat-select[formcontrolname=type').click();
        cy.get('mat-option').contains('Trusted').click();
        cy.get('input[formcontrolname=email').click({force: true}).type('test@test.com')
        cy.get('button').contains('Save').click()
        cy.wait(1000);
        cy.contains('Testy');
    }); 
});