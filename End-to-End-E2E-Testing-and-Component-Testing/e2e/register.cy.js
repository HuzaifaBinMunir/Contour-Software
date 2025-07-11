import Register from "../../pages/Register";

describe("Test Suite for Register Page", () => {
    const randomEmail = Math.random().toString(36).substring(2, 15) + '@gmail.com';
    const existingEmail = "test.huzaifamunir@gmail.com";
    const password = "pass123";

    beforeEach("Visit Register Page", () => {
        cy.visit("https://demowebshop.tricentis.com/");
    });

    it("Test Case 1: Register with random email and valid credentials", () => {
        Register.clickRegisterLink();
        Register.selectGender("male");
        Register.enterRegistrationDetails("Huzaifa", "Munir", randomEmail, password, password);
        Register.clickRegisterButton();
        Register.clickContinueButton();
        Register.verifyAccountEmail(randomEmail);
    });

    it("Test Case 2: Register with already existing email and valid credentials", () => {
        Register.clickRegisterLink();
        Register.selectGender("male");
        Register.enterRegistrationDetails("Huzaifa", "Munir", existingEmail, password, password);
        Register.clickRegisterButton();
        Register.verifyEmailAlreadyExistsMessage();
    });

    it("Test Case 3: Registration with missing required fields", () => {
        Register.clickRegisterLink();
        Register.clickRegisterButton();
        Register.verifyFieldErrors();
    });

    it("Test Case 4: Register with mismatched passwords", () => {
        Register.clickRegisterLink();
        Register.enterRegistrationDetails("Alice", "Smith", randomEmail, "password123", "password456");
        Register.clickRegisterButton();
        Register.verifyPasswordMismatchError();
    });

    it("Test Case 5: Register with invalid email format", () => {
        Register.clickRegisterLink();
        Register.enterRegistrationDetails("Charlie", "Brown", "invalid-email-format", password, password);
        Register.clickRegisterButton();
        Register.verifyInvalidEmailFormatMessage();
    });

    it("Test Case 6: Register with empty first name", () => {
        Register.clickRegisterLink();
        Register.enterRegistrationDetails("", "Brown", randomEmail, password, password);
        Register.clickRegisterButton();
        Register.verifyFirstNameRequiredMessage();
    });

    it("Test Case 7: Register with empty last name", () => {
        Register.clickRegisterLink();
        Register.enterRegistrationDetails("Charlie", "", randomEmail, password, password);
        Register.clickRegisterButton();
        Register.verifyLastNameRequiredMessage();
    });

    it("Test Case 8: Register with short password", () => {
        Register.clickRegisterLink();
        Register.enterRegistrationDetails("Sam", "Adams", randomEmail, "123", "123");
        Register.clickRegisterButton();
        Register.verifyPasswordTooShortError();
    });
});
