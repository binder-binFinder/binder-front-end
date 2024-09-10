import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import "@/styles/base/index.scss";
import Gnb from "@/components/commons/Gnb";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideGnbOnPages = ["/signin"];

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ backgroundColor: "gray", height: "100vh" }}>
        <div style={{ width: "390px", margin: "0 auto" }}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          {!hideGnbOnPages.includes(router.pathname) && <Gnb />}
        </div>
      </div>
    </QueryClientProvider>
  );
}
