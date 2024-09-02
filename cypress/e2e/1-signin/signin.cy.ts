describe("로그인 화면", () => {
  it("사용자는 소셜 로그인을 사용해서 로그인한다.", () => {
    // given - 로그인 페이지에 접근한다.

    cy.visit("/signin");

    // when - 소셜 로그인 버튼을 클릭한다.

    cy.get("[data-cy=googleBtn]").should("be.visible").as("googleBtn");
    cy.get("@googleBtn").click();

    //서버 연결 후 추가

    //소셜 로그인 창으로 이동한다.

    cy.url().should("include", "accounts.google.com");
    cy.visit("https://api.bin-finder.net/oauth2/authorization/google");

    cy.getCookie("accessToken").should("exist");
    cy.getCookie("accessToken").should("have.property", "value", "accessToken1111");

    // then - 로그인에 성공 후 [???] 페이지로 이동한다.
  });
});
