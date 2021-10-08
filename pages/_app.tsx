import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const GlobalStyle = createGlobalStyle`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: 'Roboto', sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
  `;

  return (
    <RecoilRoot>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
