describe("Test Suite - Shipping Page", () => {

    beforeEach("Add product to cart and proceed to shipping page", () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-item').first().click();
        cy.get('.add-to-cart-button').click();
        cy.get('.ico-cart').click(); // Opens the cart page
        cy.get('.checkout-button').click(); // Proceed to checkout
        cy.get('#checkout-as-guest-button').click(); // Proceed as a guest (if needed)
        cy.fillBillingDetails(); // Assumes a custom command to fill in billing details
        cy.get('.new-address-next-step-button').click(); // Proceed to shipping method
    });

    it("Verify available shipping methods are displayed", () => {
        cy.get('.shipping-method-list').should('exist'); // Checks if shipping method options are visible
        cy.get('.shipping-method-list input[type="radio"]').should('have.length.greaterThan', 0); // Ensures there are multiple shipping options
    });

    it("Select a specific shipping method", () => {
        cy.get('.shipping-method-list input[type="radio"]').first().check(); // Selects the first shipping method option
        cy.get('.shipping-method-next-step-button').click(); // Proceeds to the next step
        cy.url().should('include', 'paymentmethod'); // Verifies navigation to the payment method page
    });

    it("Check estimated delivery dates for different shipping options", () => {
        cy.get('.shipping-method-list input[type="radio"]').each(($el, index, $list) => {
            cy.wrap($el).check();
            cy.get('.shipping-method-delivery-date').eq(index).should('exist'); // Checks if each option has an estimated delivery date
        });
    });

    it("Verify error message when no shipping method is selected", () => {
        cy.get('.shipping-method-next-step-button').click(); // Proceeds without selecting a shipping option
        cy.get('.field-validation-error').should('contain', 'Please select a shipping method'); // Checks for error message
    });

    it("Verify shipping cost updates correctly for selected method", () => {
        cy.get('.shipping-method-list input[type="radio"]').first().check();
        cy.get('.shipping-method-cost').first().invoke('text').then((firstMethodCost) => {
            cy.get('.shipping-method-list input[type="radio"]').last().check();
            cy.get('.shipping-method-cost').last().invoke('text').should('not.equal', firstMethodCost); // Verifies cost changes with different options
        });
    });
});
