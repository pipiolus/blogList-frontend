describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user1 = {
      username: "Tester",
      name: "PipiolusObviusly",
      password: "admin123",
    };
    const user2 = {
      username: "Dexter",
      name: "TheSamePip",
      password: "admin123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });
  it("shows login form", () => {
    cy.contains("LogIn to App");
    cy.get(".login-btn").should("contain", "LogIn");
  });
  describe("login", function () {
    it("login user with correct credentials", function () {
      cy.get("#username").type("Tester");
      cy.get("#password").type("admin123");
      cy.get(".login-btn").click();

      cy.contains("BlogList App");
      cy.contains("Logged as user: Tester");
    });

    it("negate login and display error message with wrong credentials", function () {
      cy.get("#username").type("Tester");
      cy.get("#password").type("wrong!");
      cy.get(".login-btn").click();

      cy.get("html")
        .should("not.contain", "BlogList App")
        .and("contain", "LogIn to App");

      cy.get(".error")
        .should(
          "contain",
          "Wrong credentials: incorrect username or password"
        )
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Tester", password: "admin123" });
    });
    it("a new blog can be added", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Cypress Blog");
      cy.get("#author").type("Blog Author");
      cy.get("#url").type("http://exampleurl.com");
      cy.get("#create-blog").click();

      cy.get("html").should(
        "contain",
        "The new blog has been successfully added"
      );
      cy.contains("Cypress Blog");
    });
    it("a blog can be liked clicking the button", function () {
      cy.createBlog({
        title: "Cypress Blog",
        author: "Blog Author",
        url: "http://exampleurl.com",
      });

      cy.contains("view").click();
      cy.get(".likes").should("contain", "0");
      cy.get(".likeButton").click();
      cy.get(".likes").should("contain", "1");
    });
    it("A blog can be deleted by the creator", function () {
      cy.createBlog({
        title: "Cypress Blog",
        author: "Blog Author",
        url: "http://exampleurl.com",
      });

      cy.contains("view").click();
      cy.contains("delete").click();
      cy.get("html").should("not.contain", "Cypress Blog");
    });
    it("Only the creator can delete a blog", function () {
      cy.createBlog({
        title: "Cypress Blog",
        author: "Blog Author",
        url: "http://exampleurl.com",
      });
      cy.contains("Logout").click();

      cy.login({ username: "Dexter", password: "admin123" });

      cy.contains("view").click();
      cy.get("html").should("not.contain", "delete");
    });
  });
  describe("Order of blogs", function () {
    beforeEach(function () {
      cy.login({ username: "Dexter", password: "admin123" });
      cy.createBlog({
        title: "Blog With No Likes",
        author: "Blog Author",
        url: "http://exampleurl.com",
      });
      cy.createBlog({
        title: "Blog With Most likes",
        author: "Crazy Man",
        url: "http://exampleurl.com",
      });
      cy.createBlog({
        title: "Blog With Some Likes",
        author: "Random Boy",
        url: "http://exampleurl.com",
      });
    });
    it("are correctly sorted from most liked to less liked", function () {
      cy.get(".blog-container").eq(0).as("TheFirst");
      cy.get(".blog-container").eq(1).as("TheSecond");
      cy.get(".blog-container").eq(2).as("TheThird");

      cy.get("@TheFirst").contains("view").click();
      cy.get("@TheSecond").contains("view").click();
      cy.get("@TheThird").contains("view").click();

      cy.get("@TheFirst").find(".likeButton").as("FirstButton");
      cy.get("@TheSecond").find(".likeButton").as("SecondButton");
      cy.get("@TheThird").find(".likeButton").as("ThirdButton");

      cy.wait(3000);

      cy.get("@SecondButton").click();
      cy.wait(300);
      cy.get("@ThirdButton").click();
      cy.wait(300);
      cy.get("@FirstButton").click();
      cy.wait(300);
      cy.get("@SecondButton").click();
      cy.wait(300);
      cy.get("@FirstButton").click();
    });
  });
});
