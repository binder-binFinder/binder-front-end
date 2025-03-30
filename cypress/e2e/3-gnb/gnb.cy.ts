describe("gnb 클릭시 링크 이동 테스트", () => {
  const gnbTests = [
    {
      description: "홈에서 클릭",
      initialPath: "/",
      links: [
        {
          selector: "[data-cy=gnb2]",
          expectedUrl: "http://localhost:3000/search",
        },
        {
          selector: "[data-cy=gnb3]",
          expectedUrl: "http://localhost:3000/mypage",
        },
      ],
    },
    {
      description: "찾기에서 클릭",
      initialPath: "/search",
      links: [
        { selector: "[data-cy=gnb1]", expectedUrl: "http://localhost:3000/" },
        {
          selector: "[data-cy=gnb3]",
          expectedUrl: "http://localhost:3000/mypage",
        },
      ],
    },
    {
      description: "마이에서 클릭",
      initialPath: "/mypage",
      links: [
        { selector: "[data-cy=gnb1]", expectedUrl: "http://localhost:3000/" },
        {
          selector: "[data-cy=gnb2]",
          expectedUrl: "http://localhost:3000/search",
        },
      ],
    },
  ];
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("onBoarding", "true");
    });
    cy.window().then((win) => {
      win.localStorage.setItem("tutorial", "true");
    });
  });
  gnbTests.forEach((item, index) => {
    it(item.description, () => {
      cy.visit(item.initialPath);
      item.links.forEach((links) => {
        cy.get(links.selector).should("be.visible").click();
        cy.url().should("eq", links.expectedUrl);
      });
    });
  });
});
