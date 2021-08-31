import { useEffect } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { SiteHeader } from "@src/components/header/SiteHeader";
import { SiteFooter } from "@src/components/footer/SiteFooter";
import { GlobalStyle } from "@src/styles/globalStyle";
import { styledTheme } from "@src/styles/styledTheme";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <StyledComponentsThemeProvider theme={styledTheme}>
        <GlobalStyle />
        <SiteHeader />
        <Component {...pageProps} />
        <SiteFooter />
      </StyledComponentsThemeProvider>
    </StylesProvider>
  );
};

export default MyApp;
