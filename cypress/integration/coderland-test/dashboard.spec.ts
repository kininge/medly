describe("To Text user can use all dashboard functionalities", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    const username: string = "kininge";
    const password: string = "Pkininge@007";
    const successMessage: string = "User successfully authenticated!";
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("#login-form-submit").click();
    cy.get(".message").should("have.text", `${successMessage}`);
  });

  it("To check correct user get logged in", () => {
    cy.get(".user").should("have.text", "Pritam");
  });

  it("To check should not get more than 4 tax records", () => {
    cy.get(".tax-card").should(($card) => {
      const cardCount: number = $card.length;
      if (cardCount > 4) {
        throw new Error("tax card count can be more than 4");
      }
    });
  });

  it("To check user can go to tax detail page", () => {
    cy.get(".tax-card").first().click();
    cy.get(".tax-detail-page");
  });

  it("To check user can go to calculate tax page", () => {
    cy.get(".add-card").click();
    cy.get(".calculate-tax-page");
  });

  it("To check user can logout the application", () => {
    const logoutSuccessMessage: string = "You logged out successfully!";
    cy.get(".logout").click();
    cy.get(".message").should("have.text", `${logoutSuccessMessage}`);
  });
});
