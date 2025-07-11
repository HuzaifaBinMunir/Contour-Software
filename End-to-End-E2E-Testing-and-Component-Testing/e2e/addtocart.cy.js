import AddToCart from "../../pages/ATC";

describe("Test Suite for Add to Cart", () => {

    const categoryName = "Books"; // Change this variable to test different categories

    beforeEach("Visit website and navigate to category", () => {
        cy.visit("https://demowebshop.tricentis.com/");
        AddToCart.navigateToCategory(categoryName);
    });

    it("Test Case 1: Add a single product to the cart", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToCartButton();
        AddToCart.verifyCartQuantity(1);
    });

    it("Test Case 2: Add multiple quantities of a product to the cart", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.enterQuantity(3);
        AddToCart.clickAddToCartButton();
        AddToCart.verifyCartQuantity(3);
    });

    it("Test Case 3: Add multiple different products to the cart", () => {
        // Add first product
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToCartButton();
        AddToCart.goBack();

        // Add second product
        AddToCart.selectSecondProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToCartButton();
        AddToCart.verifyCartQuantity(2);
    });

    it("Test Case 4: Verify product details in the cart", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.captureProductDetails().then((productName) => {
            AddToCart.clickAddToCartButton();
            AddToCart.openCart();
            AddToCart.verifyProductDetailsInCart(productName);
        });
    });

    it("Test Case 5: Remove a product from the cart", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToCartButton();
        AddToCart.openCart();
        AddToCart.removeProductFromCart();
        AddToCart.updateQuantityInCart();
        AddToCart.verifyCartIsEmpty();
    });

    it("Test Case 6: Update product quantity in the cart", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToCartButton();
        AddToCart.openCart();
        AddToCart.updateQuantityInCart(5);
        AddToCart.verifyCartQuantity(5);
    });

    it("Test Case 7: Add product to wishlist from product display page", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.clickAddToWishlistButton(); // no wishlist button on website
        AddToCart.verifyWishlistNotification();
    });

    it("Test Case 8: Verify product price updates for different quantities", () => {
        AddToCart.selectFirstProduct();
        AddToCart.navigateToIndividualProduct();
        AddToCart.enterQuantity(2);
        AddToCart.clickAddToCartButton();
        AddToCart.verifyTotalPrice();
    });
});
