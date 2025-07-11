import CheckoutObjects from "../fixtures/Checkout.json";

class Checkout {

  // Clicks the checkout button to initiate checkout
  static clickCheckoutButton() {
    cy.get(CheckoutObjects.checkout_button).click();
  }

  static clickTermServiceButton() {
    cy.get(CheckoutObjects.click_terms_service).click();
}

  // Proceeds with checkout as a guest
  static proceedAsGuest() {
    cy.get(CheckoutObjects.checkout_as_guest_button).click();
  }

  // Fills in billing details
  static fillBillingDetails({ firstName, lastName, email,company, country, city, address, address2, zip, phone, fax }) {
    cy.get(CheckoutObjects.billing_first_name).clear().type(firstName);
    cy.get(CheckoutObjects.billing_last_name).clear().type(lastName);
    cy.get(CheckoutObjects.billing_email).clear().type(email);
    cy.get(CheckoutObjects.billing_company).clear().type(company);
    cy.get(CheckoutObjects.billing_country).select(country);
    cy.get(CheckoutObjects.billing_city).clear().type(city);
    cy.get(CheckoutObjects.billing_address).clear().type(address);
    cy.get(CheckoutObjects.billing_address2).clear().type(address2);
    cy.get(CheckoutObjects.billing_zip).clear().type(zip);
    cy.get(CheckoutObjects.billing_phone).clear().type(phone);
    cy.get(CheckoutObjects.billing_fax).clear().type(fax);
    cy.get(CheckoutObjects.billing_continue_button).click();
  }

  // Clicks the continue button without filling in billing details to trigger an error
  static clickContinueWithoutBillingDetails() {
    cy.get(CheckoutObjects.billing_continue_button).click();
  }

  // Proceeds to the shipping method selection step
  static proceedToShipping() {
    cy.get(CheckoutObjects.shipping_continue_button).click();
  }

  static pickupInStore(){
    cy.get(CheckoutObjects.pickup_store_button).click();
  }

  static goBackToBilling(){
    cy.get(CheckoutObjects.goback_billling_button).click();
  }

  // Selects a specific shipping method by value
  static selectShippingMethod(method) {
    cy.get(CheckoutObjects.shipping_option1).check(method);
    cy.get(CheckoutObjects.shipping_option2).check(method);
    cy.get(CheckoutObjects.shipping_option3).check(method);
    cy.get(CheckoutObjects.shipping_continue_button).click();
  }

  static goBackToShipping(){
    cy.get(CheckoutObjects.goback_shipping_button).click();
  }

  // Proceeds to the payment method selection step
  static proceedToPaymentMethod() {
    cy.get(CheckoutObjects.shippingmethod_continue_button).click();
  }

  
  // Selects a specific payment method by value
  static selectPayementMethod(method) {
    cy.get(CheckoutObjects.payment_option1).check(method);
    cy.get(CheckoutObjects.payment_option2).check(method);
    cy.get(CheckoutObjects.payment_option3).check(method);
    cy.get(CheckoutObjects.payment_option4).check(method);
  }

  static goBackToShippingMethod(){
    cy.get(CheckoutObjects.goback_shipping_method_button).click();
  }

  static proceedToPaymentInformation() {
    cy.get(CheckoutObjects.paymentmethod_continue_button).click();
  }

  static selectPayementInformation(ctype,cname,cnumber,emonth,eyear,cCode) {
    if(payment_option1){
        cy.get('#checkout-payment-info-load > .checkout-data > .section');
    }
    else if(payment_option2){
        cy.get('#checkout-payment-info-load > .checkout-data > .section');
    }
    else if(payment_option4){
        cy.get('#PurchaseOrderNumber').type;
    }
    else{
        cy.get('#CreditCardType').type(ctype);
        cy.get('#CardholderName').type(cname);
        cy.get('#CardNumber').type(cnumber);
        cy.get('#ExpireMonth').type(emonth);
        cy.get('#ExpireYear').type(eyear);
        cy.get('#CardCode').type(cCode);
    }
  }
  static goBackToPaymentMethod(){
    cy.get(CheckoutObjects.goback_payment_method_button).click();
  }

  // Proceeds to the order confirmation step
  static proceedToOrderConfirmation() {
    cy.get(CheckoutObjects.orderConfirm_continue_button).click();
  }
  
  static goBackToPaymentInformation(){
    cy.get(CheckoutObjects.goback_payment_info_button).click();
  }

  static proceedToOrderSuccessMessage(){
    cy.get(CheckoutObjects.orderconfirmation_continue_button).click();
  }

  // Verifies that the order was successfully processed
  static verifyOrderSuccess() {
    cy.get(CheckoutObjects.order_success_message).should("contain", "Your order has been successfully processed!");
  }

  // Verifies the error message for missing billing information
  static verifyBillingError() {
    cy.get(CheckoutObjects.billing_error_message).should("contain", "This field is required");
  }

  // Logs in as a registered user
  static login(email, password) {
    cy.get(CheckoutObjects.login_link).click();
    cy.get(CheckoutObjects.login_email).type(email);
    cy.get(CheckoutObjects.login_password).type(password);
    cy.get(CheckoutObjects.login_button).click();
  }

  // Enters a discount code
  static enterDiscountCode(code) {
    cy.get(CheckoutObjects.discount_code_field).type(code);
    cy.get(CheckoutObjects.apply_discount_button).click();
  }

  // Verifies that the discount has been applied
  static verifyDiscountApplied() {
    cy.get(CheckoutObjects.discount_message).should("contain", "Discount applied");
  }

  // Verifies that the discount is visible in the order summary
  static verifyDiscountInOrderSummary() {
    cy.get(CheckoutObjects.order_summary_discount).should("contain", "-");
  }
}

export default Checkout;
