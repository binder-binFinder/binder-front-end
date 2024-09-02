import { defineConfig } from "cypress";

export default defineConfig({
  // e2e: {
  //   setupNodeEvents(on, config) {
  //     // implement node event listeners here
  //   },
  // },
  e2e: {
    baseUrl: "http://localhost:3000",
    //소셜 로그인 테스트 때문에 추가
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
