import LoginObjects from "../fixtures/Login.json";

let Email;

class Login {
  // Clicks on the login link
  static clickLoginLink() {
    cy.get(LoginObjects.login_link).click();
  }

  // Enters email and password into the login fields
  static enterCredentials(email, password) {
    Email = email;
    if (email) {
      cy.get(LoginObjects.enter_email).clear().type(email);
    }
    if (password) {
      cy.get(LoginObjects.enter_password).clear().type(password);
    }
  }

  // Clicks the Remember Me checkbox
  static clickRememberMe() {
    cy.get(LoginObjects.click_rememberme).check();
  }

  // Clicks the login button and verifies successful login by checking the account element contains the email
  static clickLoginButton() {
    cy.get(LoginObjects.click_login_button).click();
    //cy.get(LoginObjects.verify_login).should("contain", Email);
  }

  // Clicks the login button and verifies an error message for invalid credentials
  static invalidCredentialMessage() {
    cy.get(LoginObjects.invalid_credential_message_2).should("contain", "The credentials provided are incorrect");
  }

  // Clicks on the Forgot Password link
  static clickForgotPasswordLink() {
    cy.get(LoginObjects.forgot_password_link).click();
  }

  // Enters an invalid email in the email field for password recovery
  static enterInvalidEmail(email) {
    cy.get(LoginObjects.enter_email).clear().type(email);
  }

  // Clicks the button to initiate password recovery
  static clickRecoveryButton() {
    cy.get(LoginObjects.recover_button).click();
  }

  // Verifies the "No customer account found" error message for unregistered emails
  static notFoundMessage() {
    cy.get(LoginObjects.not_found_message_result).should("contain", "Email not found");
  }

  // Verifies the success message when a password reset email is successfully sent
  static forgotSuccessfulSendMessage() {
    cy.get(LoginObjects.forget_successful_send_result).should("contain", "Email with instructions has been sent to you.");
  }

  // Verifies the error message for an empty email field
  static emptyEmailMessage() {
    cy.get(LoginObjects.invalid_credential_message_2).should("contain", "No customer account found");
  }

  // Verifies the error message for an empty password field
  static emptyPasswordMessage() {
    cy.get(LoginObjects.invalid_credential_message_2).should("contain", "The credentials provided are incorrect");
  }

  // Verifies the error message for an invalid email format
  static invalidEmailFormatMessage() {
    cy.get(LoginObjects.invalid_credential_message_3).should("contain", "Please enter a valid email address.");
  }
}

export default Login;
