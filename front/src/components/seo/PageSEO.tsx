import { FC } from "react";
import Head from "next/head";

type Props = {
  path?: string;
  keyword?: string;
  title: string;
  description: string;
  ogImageUrl: string;
};

export const PageSEO: FC<Props> = (props) => {
  const { path, title, keyword, description, ogImageUrl } = props;

  const siteRoot =
    process.env.NODE_ENV === "production"
      ? "http://exsample.com/"
      : "http://localhost:3000/";

  const pageUrl = `${siteRoot}${path ?? ""}`;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="サービス名" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="サービス名" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="keywords" content={keyword} />
      <meta name="robots" content="noindex" />
      <link rel="canonical" href={pageUrl} />
    </Head>
  );
};
