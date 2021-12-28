describe("To check user can sign up new customer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#sign-up-tab").click();
    cy.get(".sign-up-page");
  });

  it("To check user can get error message for to tax details available", () => {
    const takenUsername: string = "kininge";
    const message: string = "This username already taken";
    cy.get("#username").type(`${takenUsername}`);
    cy.get(".user-message").contains(`${message}`);
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

  it("To check user can open date picker", () => {
    cy.get("#birthdate").click(305, 17);
  });
});
