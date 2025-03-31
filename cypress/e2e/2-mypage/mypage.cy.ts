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

  describe("로그인 상태에 따른 출력 테스트", () => {
    it("로그인 상태 출력", () => {
      // Given: 마이페이지 접속

      cy.visit("/mypage");
      // When: 로그인 상태 확인
      // 로그인 성공 테스트
      cy.intercept("GET", "https://api.bin-finder.net/members/me", {
        statusCode: 200,
        body: { message: "로그인 성공" },
      }).as("getUserInfoSuccess");

      // Then: 로그인 상태로 화면 출력
      cy.wait("@getUserInfoSuccess").then(() => {
        cy.get("[data-cy=login]").should("be.visible");
        cy.get("[data-cy=noLogin]").should("not.exist");
      });
    });

    it("로그아웃 상태 출력", () => {
      // Given: 마이페이지 접속
      cy.visit("/mypage");

      // When: 로그아웃 상태 확인
      cy.intercept("GET", "https://api.bin-finder.net/members/me", {
        statusCode: 401,
        body: { message: "로그인 실패" },
      }).as("getUserInfoFailure");

      // Then: 로그아웃 상태로 화면 출력
      cy.wait("@getUserInfoFailure").then(() => {
        cy.get("[data-cy=noLogin]").should("be.visible");
        cy.get("[data-cy=login]").should("not.exist");
      });
    });
  });

  it("로그아웃 상태에서 소셜 로그인 출력과 이동 테스트", () => {
    // Given: 로그아웃 상태로 마이페이지 접속
    cy.visit("/mypage");

    cy.intercept("GET", "https://api.bin-finder.net/members/me", {
      statusCode: 401,
      body: { message: "로그인 실패" },
    }).as("getUserInfoFailure");

    // When: 로그아웃 상태에 따른 출력과 이동
    cy.wait("@getUserInfoFailure").then(() => {
      cy.get("[data-cy=toggle2]").should("be.visible").as("toggle2");

      cy.get("@toggle2").click();

      cy.get("[data-cy=social]").should("be.visible").as("social");
      cy.get("@social").click();
    });

    // Then: 출력 후 /signin 페이지로 이동
    cy.url().should("eq", "http://localhost:3000/signin");
  });

  it("공유하기 모달 테스트", () => {
    let domainValue = "";

    // ✅ Given: 사용자가 마이 페이지에 접속한다.
    cy.visit("/mypage");

    // ✅ When: 사용자가 설정 메뉴를 열고, 공유하기 버튼을 클릭하여 모달을 연다.
    cy.get("[data-cy=toggle2]").click();
    cy.get("[data-cy=share]").click();
    cy.get("[data-cy=shareModal]").should("be.visible").as("shareModal");

    cy.url().then((currentUrl) => {
      const domainOnly = new URL(currentUrl).origin;
      domainValue = domainOnly;

      // ✅ Then: 공유하기 모달의 URL 입력 값이 올바른 URL인지 확인한다.
      cy.get("[data-cy=shareUrl]").should("have.value", domainOnly);
    });

    // ✅ When: 사용자가 복사 버튼을 클릭한다.
    cy.get("[data-cy=shareBtn]").click();

    // ✅ Then: 클립보드에 URL이 올바르게 복사되었는지 확인한다.
    cy.window().then((win) => {
      return win.navigator.clipboard.readText().then((clipboardText) => {
        expect(clipboardText).to.equal(domainValue);
      });
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
