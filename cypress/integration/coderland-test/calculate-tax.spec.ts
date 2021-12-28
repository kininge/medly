describe("To check user can perform all action on Tax calculation page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    const username: string = "kininge";
    const password: string = "Pkininge@007";
    const successMessage: string = "User successfully authenticated!";
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("#login-form-submit").click();
    cy.get(".message").should("have.text", `${successMessage}`);
    cy.get(".add-card").click();
    cy.get(".calculate-tax-page");
  });

  it("To check user can get error message for to tax details available", () => {
    const veryOldYear: number = 1990;
    const message: string = "Government not declared tax rule for 1990 year";
    cy.get("#year").type(`${veryOldYear}`);
    cy.get(".user-message").contains(`${message}`);
  });

  it("To check user can go back to dashboard", () => {
    cy.get(".back-button").click();
    cy.get(".tax-card-container");
  });

  it("To check user can go back to dashboard", () => {
    const year: number = 2020;
    const income: number = Math.floor(Math.random() * 10000000);
    const invest: number = Math.floor(Math.random() * 200000);
    const successMessage: string = "Tax calculate successfully!";
    cy.get("#year").type(`${year}`);
    cy.get("#income").type(`${income}`);
    cy.get("#invest").type(`${invest}`);
    cy.get("#calculate-tax-form-submit").click();
    cy.get(".message").should("have.text", successMessage);
    cy.get(".tax-detail-page");
  });
});
