import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "next/link";
import { ContentWrapper } from "@src/components/wrapper/ContentWrapper";
import { mediaQuery } from "@src/styles/mediaQuery";
import { useRouter } from "next/router";

type Props = {
  category: string;
  title: string;
};

export const Breadcrumb: FC<Props> = ({ title, category }) => {
  const router = useRouter();
  const [isFeatured, setIsFeatured] = useState(false);

  const linkGenerate = (category: string) => {
    switch (category) {
      case "教師ブログ":
        return "teacherBlog";
      case "生徒ブログ":
        return "studentBlog";
      case "注目記事":
        return "featuredBlog";
    }
  };

  useEffect(() => {
    const pathname = router.pathname;
    if (pathname === "/featuredBlogs/article/[id]") setIsFeatured(true);
  }, [isFeatured, router]);

  return (
    <ContentWrapper>
      <BreadcrumbList>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link href="/" passHref>
            <BreadcrumbLink>ホーム</BreadcrumbLink>
          </Link>

          {isFeatured && (
            <Link href="/featuredBlog" passHref>
              <BreadcrumbLink>注目記事</BreadcrumbLink>
            </Link>
          )}

          {!isFeatured && (
            <Link href={`/${linkGenerate(category)}`} passHref>
              <BreadcrumbLink>{category}</BreadcrumbLink>
            </Link>
          )}

          <Typography color="textPrimary">{title}</Typography>
        </Breadcrumbs>
      </BreadcrumbList>
    </ContentWrapper>
  );
};

const BreadcrumbList = styled.div`
  position: relative;
  right: -48px;
  margin: 32px 0 24px;
  ${mediaQuery.md`
    display: none;
  `}
`;

const BreadcrumbLink = styled.a`
  border-bottom: solid 1px #000;
  color: #000;
`;
