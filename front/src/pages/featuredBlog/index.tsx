import { GetStaticProps, NextPage } from "next";
import { ArticleData } from "@src/models/articleData";
import { ContentWrapper } from "@src/components/wrapper/ContentWrapper";
import { ArticleCard } from "@src/components/card/ArticleCard";
import { FeaturedSection } from "@src/components/section/FeaturedSection";
import { PageSEO } from "@src/components/seo/PageSEO";
import { mediaQuery } from "@src/styles/mediaQuery";
import axios from "axios";
import styled from "styled-components";

type Props = {
  featuredArticle: ArticleData[];
};

const Page: NextPage<Props> = ({ featuredArticle }) => {
  return (
    <>
      <PageSEO
        path="featuredBlog"
        title="注目記事 - HAL Blog"
        description="HAL Blogの注目記事"
        ogImageUrl="https://exsample.png"
      />
      <ContentWrapper>
        <BlogHeading>注目記事</BlogHeading>
        <ArticlesContainer>
          <LeftAreaContainer>
            <CardContainer>
              {featuredArticle.map((item) => (
                <ArticleCard
                  key={item.id}
                  id={item.id}
                  blogType="featuredBlog"
                  title={item.title}
                  summary={item.summary}
                  body={item.body}
                  media={item.media}
                  category={item.category}
                  updated_at={item.updated_at}
                />
              ))}
            </CardContainer>
            <DummyAdArea1>
              <DummyAdText1>広告</DummyAdText1>
            </DummyAdArea1>
          </LeftAreaContainer>
          <FeaturedSection featuredArticle={featuredArticle} />
        </ArticlesContainer>
      </ContentWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:1337/posts/");
  const featuredArticle = res.data as ArticleData[];

  return {
    props: { featuredArticle },
  };
};

const BlogHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  text-align: center;
  margin: 48px 0;
  ${mediaQuery.sm`
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin: 0;
    padding: 80px 0 32px;
  `}
`;

const ArticlesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftAreaContainer = styled.div`
  width: 100%;
`;

const CardContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1.7em;
`;

const DummyAdArea1 = styled.div`
  margin-top: 64px;
  display: grid;
  place-items: center;
  ${mediaQuery.md`
    margin-top: 40px;
  `}
`;

const DummyAdText1 = styled.p`
  width: 70%;
  height: 90px;
  background: #c4c4c4;
  display: grid;
  place-items: center;
  ${mediaQuery.md`
    width: 100%;
    height: 280px;
  `}
`;

export default Page;
