describe("Test Suite - Product Display Page", () => {

    beforeEach("Visit product page", () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-item').first().click(); // Opens the first product's detail page
    });

    it("Verify product details display", () => {
        cy.get('.product-name').should('exist').and('not.be.empty'); // Checks for the product name
        cy.get('.product-price').should('exist').and('not.be.empty'); // Checks for the product price
        cy.get('.product-description').should('exist').and('not.be.empty'); // Checks for a product description
    });

    it("Check if product images are visible", () => {
        cy.get('.product-image').should('be.visible'); // Verifies main product image is visible
        cy.get('.product-thumbnails').should('exist'); // Checks for the existence of thumbnails
        cy.get('.product-thumbnails img').each(($el) => {
            cy.wrap($el).should('have.attr', 'src').and('not.be.empty'); // Checks if each thumbnail has a valid source
        });
    });

    it("Select a product variant", () => {
        cy.get('.product-variants').should('exist'); // Checks if variants are available
        cy.get('.product-variants select').select('Large'); // Assuming there is a size variant to select
        cy.get('.product-variants select').should('have.value', 'Large'); // Verifies the selected variant
    });

    it("Verify stock availability message", () => {
        cy.get('.stock-status').then(($status) => {
            const stockText = $status.text();
            expect(stockText).to.match(/In Stock|Out of Stock|Only [\d]+ left/); // Matches common stock statuses
        });
    });

    it("Add product to wishlist from product display page", () => {
        cy.get('.add-to-wishlist-button').click();
        cy.get('.wishlist-notification').should('contain', 'The product has been added to your wishlist'); // Confirms addition to wishlist
        cy.get('.ico-wishlist').click(); // Navigates to wishlist page to verify
        cy.get('.wishlist-content').should('contain', 'Your Wishlist').and('contain', '1 item(s)');
    });
});
