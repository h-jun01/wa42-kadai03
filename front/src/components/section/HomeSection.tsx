import { FC } from "react";
import { ArticleData } from "@src/models/articleData";
import { ArticleCard } from "@src/components/card/ArticleCard";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled, { css } from "styled-components";
import Link from "next/link";

type Props = {
  heading: "注目記事" | "生徒ブログ" | "教師ブログ";
  blogType: "studentBlog" | "teacherBlog" | "featuredBlog";
  bgcolor: string;
  articleData: ArticleData[];
};

export const HomeSection: FC<Props> = ({
  heading,
  blogType,
  bgcolor,
  articleData,
}) => {
  return (
    <SectionContainer>
      <TopHeading>{heading}</TopHeading>
      <TopCardContainer>
        {articleData.map((item: ArticleData) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            blogType={blogType}
            title={item.title}
            category={item.category}
            body={item.body}
            media={item.media}
            updated_at={item.updated_at}
            summary={item.summary}
          />
        ))}
      </TopCardContainer>
      <Button bgcolor={bgcolor}>
        <Link href={`/${blogType}`}>
          <a>{heading}一覧へ</a>
        </Link>
      </Button>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  margin-top: 80px;
  ${mediaQuery.sm`
    margin-top: 48px;
  `}
`;

const TopHeading = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  margin: 56px 0;
  ${mediaQuery.sm`
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin: 40px 0 24px;
  `}
`;

const TopCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 32px;
  ${mediaQuery.sm`
    grid-template-columns: 1fr;
    grid-gap: 24px;
  `}
`;

const Button = styled.button<{ bgcolor: string }>`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.normalL};
  color: ${({ theme }) => theme.colors.primary.white};
  margin: 32px 0 64px;
  border-radius: 4px;
  outline: none;
  ${({ bgcolor }) =>
    css`
      background-color: ${bgcolor};
    `};
  a {
    display: block;
    padding: 10px 12px;
  }
  ${mediaQuery.sm`
    font-size: ${({ theme }) => theme.fontSizes.normalS};
    margin: 16px 0 32px;
  `}
`;
