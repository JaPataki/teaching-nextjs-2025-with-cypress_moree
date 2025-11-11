describe("Home Page Albums", () => {
  it("intercepts and mocks API", () => {
    // 1️⃣ Zachytenie requestu
    cy.intercept("GET", "/api/albums", {
      statusCode: 200,
      body: [{ id: 1, name: "Mocked Album", author_name: "Mock Artist", release_date: "11-11-2025" }]
      
    }).as("getAlbums");

    // 2️⃣ Návšteva stránky
    cy.visit("/");

    // 3️⃣ Počkaj, kým sa API zavolá
    cy.wait("@getAlbums");

    // 4️⃣ Over, že UI zobrazilo výsledok
    cy.contains("Mocked Album").should("be.visible");
  });
});