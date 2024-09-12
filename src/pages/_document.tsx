import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="portal-root"></div>
      </body>
    </Html>
  );
}
