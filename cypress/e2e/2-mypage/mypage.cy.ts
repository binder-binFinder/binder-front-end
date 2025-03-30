describe("마이페이지 쿠키 인증", () => {
  beforeEach(() => {
    cy.visit("/mypage");
  });

  it("마이페이지 방문", () => {
    // 로그인 후 마이페이지 요소 확인
    cy.get("[data-cy=toggle1]").should("be.visible").as("toggle1");
    cy.get("[data-cy=toggle2]").should("be.visible").as("toggle2");

    cy.get("@toggle2").click();
    cy.get("@toggle1").click();
  });

  it("로그인 상태에 따른 출력", () => {
    // 로그인 성공 테스트
    cy.intercept("GET", "https://api.bin-finder.net/members/me", {
      statusCode: 200,
      body: { message: "로그인 성공" },
    }).as("getUserInfoSuccess");

    cy.visit("/mypage");

    cy.wait("@getUserInfoSuccess").then(() => {
      cy.get("[data-cy=login]").should("be.visible");
      cy.get("[data-cy=noLogin]").should("not.exist");
    });

    // 로그인 실패 테스트를 위해 다시 설정
    cy.intercept("GET", "https://api.bin-finder.net/members/me", {
      statusCode: 401,
      body: { message: "로그인 실패" },
    }).as("getUserInfoFailure");

    cy.reload();

    cy.wait("@getUserInfoFailure").then(() => {
      cy.get("[data-cy=noLogin]").should("be.visible");
      cy.get("[data-cy=login]").should("not.exist");
    });
  });

  describe("마이페이지 테마 변경 기능", () => {
    it("다크 모드로 변경 후 유지되는지 확인", () => {
      // Given: 기본 테마가 라이트 모드로 설정되어 있다.
      cy.get("html").should("have.attr", "theme", "light");

      // When: 사용자가 설정 메뉴로 이동하여 다크 모드를 선택한다.
      cy.get("[data-cy=toggle2]").click();
      cy.get("[data-cy=theme]").click();
      cy.get("[data-cy=dark]").click();
      cy.get("[data-cy=choice]").click();

      // Then: 테마가 다크 모드로 변경된다.
      cy.get("html").should("have.attr", "theme", "dark");

      // When: 페이지를 새로고침한다.
      cy.reload();

      // Then: 다크 모드 상태가 유지된다.
      cy.get("html").should("have.attr", "theme", "dark");
    });

    it("라이트 모드로 변경 후 유지되는지 확인", () => {
      // Given: 현재 테마가 다크 모드로 설정되어 있다.
      cy.get("[data-cy=toggle2]").click();
      cy.get("[data-cy=theme]").click();
      cy.get("[data-cy=dark]").click();
      cy.get("[data-cy=choice]").click();
      cy.get("html").should("have.attr", "theme", "dark");

      // When: 사용자가 설정 메뉴로 이동하여 라이트 모드를 선택한다.
      cy.get("[data-cy=toggle2]").click();
      cy.get("[data-cy=theme]").click();
      cy.get("[data-cy=light]").click();
      cy.get("[data-cy=choice]").click();

      // Then: 테마가 라이트 모드로 변경된다.
      cy.get("html").should("have.attr", "theme", "light");

      // When: 페이지를 새로고침한다.
      cy.reload();

      // Then: 라이트 모드 상태가 유지된다.
      cy.get("html").should("have.attr", "theme", "light");
    });
  });
});
