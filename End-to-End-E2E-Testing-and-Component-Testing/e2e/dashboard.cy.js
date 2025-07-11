describe("Test Suite - Dashboard", () => {

    beforeEach("Login and visit dashboard", () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.ico-login').click();
        cy.get('#Email').type("test.huzaifamunir@gmail.com");
        cy.get('#Password').type("pass123");
        cy.get('form > .buttons > .button-1').click();
        cy.get('.ico-account').click(); // Assuming this navigates to the dashboard
    });

    it("Check if dashboard loads correctly", () => {
        cy.get('.dashboard-title').should('contain', 'My Account'); // Assuming there’s a title for the dashboard page
        cy.get('.account-info').should('exist'); // Checks for an account information section
    });

    it("Update personal information", () => {
        cy.get('.account-info').click();
        cy.get('#FirstName').clear().type("UpdatedFirstName");
        cy.get('#LastName').clear().type("UpdatedLastName");
        cy.get('.save-button').click();
        cy.get('.result').should('contain', 'Your information has been updated'); // Assuming this confirmation message
    });

    it("Navigate to order history", () => {
        cy.get('.order-history').click(); // Assuming this navigates to order history
        cy.get('.order-list').should('exist'); // Checks for the presence of an order list
        cy.get('.order-title').should('contain', 'Order History');
    });

    it("Add a new address", () => {
        cy.get('.addresses').click(); // Assuming this navigates to address management
        cy.get('.add-new-address-button').click();
        cy.get('#Address_FirstName').type("John");
        cy.get('#Address_LastName').type("Doe");
        cy.get('#Address_City').type("New York");
        cy.get('#Address_Address1').type("123 Main St");
        cy.get('#Address_ZipPostalCode').type("10001");
        cy.get('#Address_PhoneNumber').type("1234567890");
        cy.get('.save-button').click();
        cy.get('.result').should('contain', 'The new address has been added');
    });

    it("Log out from the dashboard", () => {
        cy.get('.ico-logout').click();
        cy.get('.ico-login').should('exist'); // Checks if redirected to the login page
    });
});
