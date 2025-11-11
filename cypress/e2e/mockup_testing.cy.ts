describe("Home Page Albums", () => {
  it("Expected statusCode 500", () => {
    // 1️⃣ Zachytenie requestu
    cy.intercept("GET", "/api/albums", {
      statusCode: 500,
      body: [{ id: 1, name: "Mocked Album", author_name: "Mock Artist", release_date: "11/11/2025" }]

    }).as("getAlbums");

    // 2️⃣ Návšteva stránky
    cy.visit("/");

    
    cy.wait("@getAlbums");

    
    cy.contains("Truhlik nemaš server !").should("be.visible");
   });

  it("Shows loading state", () => {
   cy.intercept("GET", "/api/albums", (req) => {
      req.on("response", (res) => {
        res.setDelay(2000); 
      });
    }).as("getAlbums");

 
    cy.visit("/");
    
    cy.contains("Loading...").should("be.visible"); 
  
  
  
  });

  it("Loading stage disapiers when data is loaded", () => {
    cy.intercept("GET", "/api/albums", (req) => {
      req.on("response", (res) => {
        res.setDelay(2000); 
      });
    }).as("getAlbums");

   
    cy.visit("/");
   
    cy.wait("@getAlbums");

   
    cy.contains("Loading...").should("not.exist"); 
  });

  

});

