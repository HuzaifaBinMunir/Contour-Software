import Checkout from "../../pages/Checkout";
import ATC from "../../pages/ATC";
import Login from "../../pages/Login";


describe("Test Suite for Checkout", () => {

    const categoryName = "Books"; // Change this variable to test different categories

    beforeEach("Add a product to the cart and navigate to checkout", () => {
        cy.visit("https://demowebshop.tricentis.com/");
        ATC.navigateToCategory(categoryName);
        ATC.selectFirstProduct();
        ATC.navigateToIndividualProduct();
        ATC.clickAddToCartButton();
        ATC.openCart();
        Checkout.clickTermServiceButton();
        Checkout.clickCheckoutButton();
    });

    it.only("Test Case 1: Proceed with checkout as a guest", () => {
        Checkout.proceedAsGuest();
        Checkout.fillBillingDetails({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            company: "xyz",
            country: "United States",
            city: "New York",
            address: "123 Main St",
            address2: "St. Smith's Avenue",
            zip: "10001",
            phone: "1234567890",
            fax:"1234567890"
        });
        Checkout.proceedToShipping();
        Checkout.selectShippingMethod();
        Checkout.proceedToPaymentmethod();
        Checkout.proceedToPaymentInformation();
        Checkout.proceedToOrderConfirmation();
        Checkout.verifyOrderSuccess();
    });

    it("Test Case 2: Proceed with checkout as a registered user", () => {
        Checkout.login("test.huzaifamunir@gmail.com", "pass123");
        Checkout.openCart();
        Checkout.clickCheckoutButton();
        Checkout.proceedToShipping();
        Checkout.proceedToPayment();
        Checkout.proceedToConfirm();
        Checkout.verifyOrderSuccess();
    });

    it("Test Case 3: Verify error message for missing billing information", () => {
        Checkout.proceedAsGuest();
        Checkout.clickContinueWithoutBillingDetails();
        Checkout.verifyBillingError();
    });

    it("Test Case 4: Choose different shipping methods", () => {
        Checkout.proceedAsGuest();
        Checkout.fillBillingDetails({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            country: "United States",
            city: "New York",
            address: "123 Main St",
            zip: "10001",
            phone: "1234567890"
        });
        Checkout.selectShippingMethod("Next Day Air");
        Checkout.proceedToPayment();
        Checkout.proceedToConfirm();
        Checkout.verifyOrderSuccess();
    });

    it("Test Case 5: Apply discount code during checkout", () => {
        Checkout.enterDiscountCode("DISCOUNT2024");
        Checkout.verifyDiscountApplied();
        Checkout.clickCheckoutButton();
        Checkout.verifyDiscountInOrderSummary();
    });

    it("Test Case 6: Verify error message for invalid discount code", () => {
        Checkout.enterDiscountCode("INVALIDCODE");
        Checkout.applyDiscount();
        Checkout.verifyInvalidDiscountMessage();
    });

    it("Test Case 7: Verify billing address retention for registered user", () => {
        Checkout.login("test.huzaifamunir@gmail.com", "pass123");
        Checkout.openCart();
        Checkout.clickCheckoutButton();
        Checkout.verifyBillingAddressRetained({
            firstName: "Test",
            lastName: "User",
            address: "123 Main St",
            city: "New York",
            zip: "10001",
            country: "United States"
        });
    });

    it("Test Case 8: Attempt checkout with insufficient stock", () => {
        Checkout.selectFirstProduct();
        Checkout.enterQuantity("1000"); // Assuming a very high quantity to simulate insufficient stock
        Checkout.clickAddToCartButton();
        Checkout.verifyInsufficientStockError();
    });
});
