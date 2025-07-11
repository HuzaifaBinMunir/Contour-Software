import Login from "../../pages/Login"

describe("Test Suite for Login Page", () => {
    let email = "ofwddbu30e8@gmail.com";
    let password = "pass123";
    let empEmail = "";
    let invalidEmail = "test-fake@gmail.com";
    let invalidPassword = "123456";

    beforeEach("Visit URL", () => {
        cy.visit("https://demowebshop.tricentis.com/");
    });

    it("Test Case 1: Valid username and password combination", () => {
        Login.clickLoginLink();
        Login.enterCredentials(email, password);
        Login.clickLoginButton();
    });

    it("Test Case 2: Successful login with Remember Me option selected", () => {
        Login.clickLoginLink();
        Login.enterCredentials(email, password);
        Login.clickRememberMe();
        Login.clickLoginButton();
    });

    it("Test Case 3: Password reset with unregistered email", () => {
        Login.clickLoginLink();
        Login.clickForgotPasswordLink();
        Login.enterInvalidEmail(invalidEmail);
        Login.clickRecoveryButton();
        Login.notFoundMessage();
    });

    it("Test Case 4: Successful password reset via email", () => {
        Login.clickLoginLink();
        Login.clickForgotPasswordLink();
        Login.enterInvalidEmail(email);
        Login.clickRecoveryButton();
        Login.forgotSuccessfulSendMessage();
    });

    it("Test Case 5: Incorrect password for a valid username", () => {
        Login.clickLoginLink();
        Login.enterCredentials(email, invalidPassword);
        Login.clickLoginButton();
        Login.invalidCredentialMessage();
    });

    it("Test Case 6: Empty username field", () => {
        Login.clickLoginLink();
        Login.enterCredentials(empEmail, password);
        Login.clickLoginButton();
        Login.emptyEmailMessage();
    });

    it("Test Case 7: Empty password field", () => {
        Login.clickLoginLink();
        Login.enterCredentials(email, "");
        Login.clickLoginButton();
        Login.emptyPasswordMessage();
    });

    it("Test Case 8: Login with invalid email format", () => {
        Login.clickLoginLink();
        Login.enterCredentials("invalid-email-format", password);
        Login.clickLoginButton();
        Login.invalidEmailFormatMessage();
    });
});
