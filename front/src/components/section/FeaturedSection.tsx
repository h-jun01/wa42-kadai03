import { FC } from "react";
import { ArticleData } from "@src/models/articleData";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled from "styled-components";
import Link from "next/link";

type Props = {
  featuredArticle: ArticleData[];
};

export const FeaturedSection: FC<Props> = ({ featuredArticle }) => {
  return (
    <RightAreaContainer>
      <RightAreaWrapper>
        <DummyAdArea2>広告</DummyAdArea2>
        <RightAreaHeading>注目記事</RightAreaHeading>
        {featuredArticle
          .reverse()
          .slice(0, 4)
          .map((item: ArticleData) => (
            <Link
              href={`/featuredBlog/article/[id]`}
              as={`/featuredBlog/article/${item.id}`}
              key={item.id}
            >
              <a>
                <PopularArticleContainer>
                  <PopularArticleImage>
                    <img
                      src={`http://localhost:1337${item.media.url}`}
                      alt="mainVisual"
                    />
                  </PopularArticleImage>
                  <PopularArticleTitle>{item.title}</PopularArticleTitle>
                </PopularArticleContainer>
              </a>
            </Link>
          ))}
        <RightAreaHeading>関連サービス</RightAreaHeading>
        <DummyAdArea3>広告</DummyAdArea3>
      </RightAreaWrapper>
    </RightAreaContainer>
  );
};

const RightAreaContainer = styled.div`
  min-width: 330px;
  max-width: 330px;
  height: 100%;
  background: #f3f3f3;
  margin-left: 36px;
  ${mediaQuery.md`
    display: none;
  `}
`;

const RightAreaWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const DummyAdArea2 = styled.div`
  display: grid;
  place-items: center;
  height: 50px;
  background: #fafafa;
  margin-top: 16px;
`;

const RightAreaHeading = styled.h4`
  text-align: center;
  margin: 32px 0;
`;

const DummyAdArea3 = styled.div`
  display: grid;
  place-items: center;
  height: 280px;
  background: #fafafa;
  margin-bottom: 16px;
`;

const PopularArticleContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const PopularArticleImage = styled.p`
  width: 90px;
  height: 55px;
  > img {
    min-width: 90px;
    max-width: 90px;
    height: 55px;
    object-fit: cover;
  }
`;

const PopularArticleTitle = styled.h5`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 2;
  overflow: hidden;
  font-weight: normal;
  margin: auto 0 auto 8px;
`;
