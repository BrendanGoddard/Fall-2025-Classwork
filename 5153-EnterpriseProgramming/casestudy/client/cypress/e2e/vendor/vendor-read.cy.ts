describe('Vendor - Page Load', () => {
    it('Visits the /vendors page and finds the developer\'s last name', () => {
        cy.visit('/');
        cy.get('button').click();
        cy.contains('a', 'Vendors').click();
        cy.contains('Goddard');
    });
});