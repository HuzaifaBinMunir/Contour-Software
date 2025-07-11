import CartObjects from "../fixtures/ATC.json";

class AddToCart {
  
  // Navigates to a specific product category
  static navigateToCategory(categoryName) {
    cy.get(CartObjects.category_menu).contains(categoryName).click();
  }

  // Selects the first product in the category listing
  static selectFirstProduct() {
    cy.get(CartObjects.first_product).click();
  }

  // Selects the second product in the category listing
  static selectSecondProduct() {
    cy.get(CartObjects.second_product).click();
  }

  // Clicks the add-to-cart button on the product page
  static clickAddToCartButton() {
    cy.get(CartObjects.click_atc_button).click();
  }
  //Opens individual product page
  static navigateToIndividualProduct(){
    cy.get(':nth-child(1) > .product-item > .details > .product-title > a').click();
  }

  // Enters a specified quantity in the quantity input field
  static enterQuantity(quantity) {
    cy.get(CartObjects.enter_qty).clear().type(quantity);
  }

  // Verifies the cart quantity displayed in the header
  static verifyCartQuantity(expectedQuantity) {
    cy.get(CartObjects.cart_quantity).should("contain", expectedQuantity);
  }

  // Navigates back to the previous page
  static goBack() {
    cy.go("back");
  }

  // Opens the cart page
  static openCart() {
    cy.get(CartObjects.click_cart_icon).click();
  }

  // Verifies the product details (e.g., name) in the cart
  static verifyProductDetailsInCart(productName) {
    cy.get(CartObjects.cart_item_name).first().should("contain", productName);
  }

  // Captures and returns the product name from the product display page
  static captureProductDetails() {
    return cy.get(CartObjects.product_name).invoke("text");
  }

  // Removes the first product from the cart
  static removeProductFromCart() {
    cy.get(CartObjects.click_cart_remove_check).first().click();
  }

  static u

  // Verifies that the cart is empty
  static verifyCartIsEmpty() {
    cy.get(CartObjects.empty_cart_message).should("contain", "Your Shopping Cart is empty!");
  }

  // Adds a product to the wishlist from the product display page
  static clickAddToWishlistButton() {
    cy.get(CartObjects.add_to_wishlist_button).click();
  }

  // Verifies that the wishlist notification is displayed
  static verifyWishlistNotification() {
    cy.get(CartObjects.wishlist_notification).should("be.visible");
  }

  // Verifies the total price of the items in the cart after quantity update
  static verifyTotalPrice() {
    cy.get(CartObjects.total_price).should("not.be.empty");
  }

  // Updates the product quantity directly in the cart
  static updateQuantityInCart(quantity) {
    if (quantity) {
      cy.get(CartObjects.cart_quantity_input).clear().type(quantity);
    }
    //cy.get(CartObjects.cart_quantity_input).clear().type(quantity);
    cy.get(CartObjects.click_update_cart_button).click();
  }
}

export default AddToCart;
