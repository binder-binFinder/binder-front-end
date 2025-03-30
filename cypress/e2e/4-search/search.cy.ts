describe("검색 테스트", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("onBoarding", "true");
    });
    cy.window().then((win) => {
      win.localStorage.setItem("tutorial", "true");
    });
  });
  it("홈에서 상단 검색 누르면 이동", () => {
    // given 홈 화면에 위치하고 상단에 검색바 출력
    cy.visit("/");
    cy.get("[data-cy=searchBtn]").should("be.visible").as("searchBtn");

    // when 상단에 위치한 검색바를 클릭
    cy.get("@searchBtn").click();

    // then /search 페이지로 이동
    cy.url().should("include", "/search");
  });

  it("검색어 입력시 키워드 자동완성", () => {
    // given 검색 페이지에 위치
    cy.visit("/search");

    // when 상단에 위치한 검색바를 클릭 후 키워드 입력 (동등분할로 아무 단어나 입력..?)
    cy.get("[data-cy=searchInput]").should("be.visible").as("searchInput");
    cy.get("@searchInput").click();
    cy.get("@searchInput").type("강");

    // then 입력한 단어와 관련된 단어가 검색바 하단에 출력
    cy.get("[data-cy=dropSearch]").should("be.visible").as("dropSearch");
    cy.get("@dropSearch").should("be.visible");
  });
});
