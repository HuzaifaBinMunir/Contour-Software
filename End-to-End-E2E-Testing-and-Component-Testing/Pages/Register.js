import RegisterObjects from "../fixtures/Register.json";

let Email;

class Register {
  
  // Clicks on the register link
  static clickRegisterLink() {
    cy.get(RegisterObjects.register_link).click();
  }

  // Selects gender option (male or female)
  static selectGender(gender) {
    if (gender === "male") {
      cy.get(RegisterObjects.gender_1).click();
    } else if (gender === "female") {
      cy.get(RegisterObjects.gender_2).click();
    }
  }

  // Enters registration details including first name, last name, email, password, and confirm password
  static enterRegistrationDetails(firstName, lastName, email, password, confirmPassword) {
    Email = email;
    if (firstName !== undefined) {
        cy.get(RegisterObjects.enter_firstname).clear();
        if (firstName) cy.get(RegisterObjects.enter_firstname).type(firstName);
    }
     // Last Name
     if (lastName !== undefined) {
        cy.get(RegisterObjects.enter_lastname).clear();
        if (lastName) {
            cy.get(RegisterObjects.enter_lastname).type(lastName);
        }
    }

    // Email
    if (email !== undefined) {
        cy.get(RegisterObjects.enter_email).clear();
        if (email) {
            cy.get(RegisterObjects.enter_email).type(email);
        }
    }

    // Password
    if (password !== undefined) {
        cy.get(RegisterObjects.enter_password).clear();
        if (password) {
            cy.get(RegisterObjects.enter_password).type(password);
        }
    }

    // Confirm Password
    if (confirmPassword !== undefined) {
        cy.get(RegisterObjects.enter_confirm_password).clear();
        if (confirmPassword) {
            cy.get(RegisterObjects.enter_confirm_password).type(confirmPassword);
        }
    }
    //cy.get(RegisterObjects.enter_firstname).clear().type(firstName);
    //cy.get(RegisterObjects.enter_lastname).clear().type(lastName);
    //cy.get(RegisterObjects.enter_email).clear().type(email);
    //cy.get(RegisterObjects.enter_password).clear().type(password);
    //cy.get(RegisterObjects.enter_confirm_password).clear().type(confirmPassword);
  }

  // Clicks the register button to submit the form
  static clickRegisterButton() {
    cy.get(RegisterObjects.click_register_button).click();
  }

  // Clicks the continue button after successful registration
  static clickContinueButton() {
    cy.get(RegisterObjects.click_continue_button).click();
  }

  // Verifies that the registered email is displayed in the account header
  static verifyAccountEmail(expectedEmail) {
    cy.get(RegisterObjects.verify_account_email).should("contain", expectedEmail);
  }

  // Verifies error message for an already registered email
  static verifyEmailAlreadyExistsMessage() {
    cy.get(RegisterObjects.email_already_exists_error).should("contain", "The specified email already exists");
  }

  // Verifies error message when required fields are missing
  static verifyFieldErrors() {
    cy.get(RegisterObjects.firstname_error).should("contain", "First name is required.");
    cy.get(RegisterObjects.lastname_error).should("contain", "Last name is required.");
    cy.get(RegisterObjects.email_error).should("contain", "Email is required.");
    cy.get(RegisterObjects.password_error).should("contain", "Password is required.");
    cy.get(RegisterObjects.confirm_password_error).should("contain", "Password is required.");
  }

  // Verifies error message for mismatched passwords
  static verifyPasswordMismatchError() {
    cy.get(RegisterObjects.password_mismatch_error).should("contain", "The password and confirmation password do not match.");
  }

  // Verifies error message for an invalid email format
  static verifyInvalidEmailFormatMessage() {
    cy.get(RegisterObjects.invalid_email_format_error).should("contain", "Wrong email");
  }

  // Verifies error message for missing first name field
  static verifyFirstNameRequiredMessage() {
    cy.get(RegisterObjects.firstname_error).should("contain", "First name is required.");
  }

  // Verifies error message for missing last name field
  static verifyLastNameRequiredMessage() {
    cy.get(RegisterObjects.lastname_error).should("contain", "Last name is required.");
  }

  // Verifies error message for a password that is too short
  static verifyPasswordTooShortError() {
    cy.get(RegisterObjects.password_length_message).should("contain", "The password should have at least 6 characters.");
  }
}

export default Register;
