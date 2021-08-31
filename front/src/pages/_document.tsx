import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { Fragment, ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets as MaterialServerStyleSheets } from "@material-ui/core";

class CustomDocument extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp:
            (App) =>
            (
              props
            ): ReactElement<{
              sheet: ServerStyleSheet;
            }> =>
              styledComponentsSheet.collectStyles(
                materialUiSheets.collect(<App {...props} />)
              ),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <Fragment key="styles">
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {materialUiSheets.getStyleElement()}
          </Fragment>,
        ],
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
