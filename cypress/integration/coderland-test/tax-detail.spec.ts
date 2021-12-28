describe("To check user can do all actions in tax detail page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    const username: string = "kininge";
    const password: string = "Pkininge@007";
    const successMessage: string = "User successfully authenticated!";
    cy.get("#username").type(`${username}`);
    cy.get("#password").type(`${password}`);
    cy.get("#login-form-submit").click();
    cy.get(".message").should("have.text", `${successMessage}`);
    cy.get(".tax-card").first().click();
    cy.get(".tax-detail-page");
  });

  it("To check user can see all tax details", () => {
    cy.get(".tax-container")
      .find(".tax-amount")
      .should(($taxAmount) => {
        const taxAmount = $taxAmount.data;

        if (!taxAmount || taxAmount.length === 0) {
          throw new Error("Tax amount can not be empty");
        }
      });
    cy.get(".tax-card").each(($taxCard) => {
      const amountData = $taxCard.find(".amount").data;

      if (!amountData || amountData.length === 0) {
        throw new Error("Amount can not be empty");
      }
    });
  });

  it("To check user can go back to dashboard", () => {
    cy.get(".back-button").click();
    cy.get(".tax-card-container");
  });
});
