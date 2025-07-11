describe("Test Suite - Product Listing Page", () => {

    beforeEach("Visit product listing page", () => {
        cy.visit('https://demowebshop.tricentis.com/books'); // Assuming 'Books' category page as an example
    });

    it("Verify products are displayed in the listing", () => {
        cy.get('.product-item').should('have.length.greaterThan', 0); // Ensures there is at least one product displayed
        cy.get('.product-item').each(($el) => {
            cy.wrap($el).find('.product-title').should('exist'); // Verifies each product has a title
            cy.wrap($el).find('.product-price').should('exist'); // Verifies each product has a price
        });
    });

    it("Filter products by price range", () => {
        cy.get('#price-filter').click(); // Assuming there's a price filter dropdown
        cy.get('#price-range-10-50').click(); // Selects a specific price range option
        cy.get('.product-item').each(($el) => {
            cy.wrap($el).find('.product-price').invoke('text').then((priceText) => {
                const price = parseFloat(priceText.replace('$', ''));
                expect(price).to.be.within(10, 50); // Checks if each product is within the selected price range
            });
        });
    });

    it("Sort products by highest price", () => {
        cy.get('#sort-by-dropdown').select('Price: High to Low'); // Selects the sorting option
        cy.get('.product-item .product-price').then((prices) => {
            const priceValues = prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));
            expect(priceValues).to.deep.equal(priceValues.sort((a, b) => b - a)); // Verifies products are sorted by price descending
        });
    });

    it("Add a product to cart from the listing page", () => {
        cy.get('.product-item').first().find('.add-to-cart-button').click(); // Adds the first listed product to the cart
        cy.get('.cart-qty').should('contain', '1'); // Verifies cart quantity increased
    });

    it("Verify pagination works on product listing page", () => {
        cy.get('.pagination').should('exist'); // Checks for pagination on the page
        cy.get('.pagination').contains('2').click(); // Navigates to the second page
        cy.url().should('include', 'page=2'); // Verifies URL has changed to the second page
        cy.get('.product-item').should('have.length.greaterThan', 0); // Ensures products are displayed on the second page
    });
});
