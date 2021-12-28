describe("To login Coderland income tax application", () => {
  //Before running each test start visit web app
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("To check user can toggle obscure in password felid", () => {
    const testText: string = "testing toggle password";
    cy.get("#password")
      .type(`${testText}`)
      .invoke("attr", "type")
      .should("eq", "password");
    cy.get("#visibility-toggle-button").click();
    cy.get("#password").invoke("attr", "type").should("eq", "text");
    cy.get("#visibility-toggle-button").click();
    cy.get("#password").invoke("attr", "type").should("eq", "password");
  });

  it("To check user not get authenticate by wrong username and password", () => {
    const username: string = "test_username";
    const password: string = "test_password";
    const errorMessage: string =
      "Authentication failed, Please check your username and password";
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("#login-form-submit").click();
    cy.get(".message").should("have.text", `${errorMessage}`);
  });

  it("To check user can switch between login and sign up tabs", () => {
    cy.get("#sign-up-tab").click();
    cy.get(".sign-up-page");
    cy.get("#login-tab").click();
    cy.get(".login-page");
  });

  it("To check user get authenticate by correct username and password", () => {
    const username: string = "kininge";
    const password: string = "Pkininge@007";
    const successMessage: string = "User successfully authenticated!";
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("#login-form-submit").click();
    cy.get(".message").should("have.text", `${successMessage}`);
  });
});
