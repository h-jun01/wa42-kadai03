import { FC } from "react";
import { ArticleData } from "@src/models/articleData";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled, { css } from "styled-components";
import Link from "next/link";

type Props = {
  relatedArticles: ArticleData[];
  id: number;
  blogType: "studentBlog" | "teacherBlog" | "featuredBlog";
};

export const RelatedArticles: FC<Props> = ({
  id,
  relatedArticles,
  blogType,
}) => {
  return (
    <ArticleContent>
      <h3>関連記事</h3>
      <RelatedArticlesContainer>
        {relatedArticles
          .filter((i) => i.id !== id)
          .reverse()
          .slice(0, 3)
          .map((item: ArticleData) => (
            <Link
              href={`/${blogType}/article/[id]`}
              as={`/${blogType}/article/${item.id}`}
              key={item.id}
            >
              <a>
                <RelatedArticlesArea>
                  <p>
                    <img
                      src={`http://localhost:1337${item.media.url}`}
                      alt="mainVisual"
                    />
                  </p>
                  <RelatedArticlesTitle>{item.title}</RelatedArticlesTitle>
                </RelatedArticlesArea>
              </a>
            </Link>
          ))}
      </RelatedArticlesContainer>
    </ArticleContent>
  );
};

const ArticleContent = styled.section`
  > h3 {
    font-size: ${({ theme }) => theme.fontSizes.large};
    padding-bottom: 8px;
    margin-top: 56px;
    margin-bottom: 16px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.gray};
    ${mediaQuery.sm`
      font-size: ${({ theme }) => theme.fontSizes.large};
    `};
  }
`;

const RelatedArticlesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
  ${mediaQuery.sm`
    display: block;
  `}
  a {
    display: block;
    width: 30%;
    ${mediaQuery.sm`
      width: 100%;
    `}
  }
`;

const RelatedArticlesArea = styled.div`
  width: 100%;
  ${mediaQuery.sm`
    margin-bottom: 32px;
  `}
  img {
    width: 100%;
    height: 125px;
    object-fit: cover;
    ${mediaQuery.sm`
      height: 200px;
    `}
  }
  p {
    color: ${({ theme }) => theme.colors.secondary.gray};
  }
`;

const RelatedArticlesTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 2;
  overflow: hidden;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.normalS};
`;
