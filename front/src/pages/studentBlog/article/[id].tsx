import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ArticleData } from "@src/models/articleData";
import { formatDate } from "@src/utils/formatDate";
import { ContentWrapper } from "@src/components/wrapper/ContentWrapper";
import { FeaturedSection } from "@src/components/section/FeaturedSection";
import { CodeBlock } from "@src/components/highlighter/CodeBlock";
import { PageSEO } from "@src/components/seo/PageSEO";
import { RelatedArticles } from "@src/components/section/RelatedArticles";
import { mediaQuery } from "@src/styles/mediaQuery";
import { Breadcrumb } from "@src/components/breadcrumb/Breadcrumb";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

type Props = {
  posts: ArticleData;
  featuredArticle: ArticleData[];
};

const studentBlogPage: NextPage<Props> = ({ posts, featuredArticle }) => {
  return (
    <>
      <PageSEO
        path={`studentBlog/article/${posts.id}`}
        title={`${posts.title} - HAL Blog`}
        description={posts.summary}
        ogImageUrl={posts.media.url}
      />
      <Breadcrumb title={posts.title} category="生徒ブログ" />
      <ContentWrapper>
        <ArticlesContainer>
          <Article>
            <TagAndDateContainer>
              <TagContainer>
                <Tag>{posts.category.name}</Tag>
              </TagContainer>
              <Date>{formatDate(posts.updated_at)}</Date>
            </TagAndDateContainer>
            <ArticleTitle>{posts.title}</ArticleTitle>
            <MainVisualContainer>
              <img
                src={`http://localhost:1337${posts.media.url}`}
                alt="mainVisual"
              />
            </MainVisualContainer>
            <DummyAdArea>
              <DummyAdText>広告</DummyAdText>
            </DummyAdArea>
            <ArticleContent>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                children={posts.body}
                components={{
                  code: CodeBlock,
                }}
                skipHtml={true}
              />
            </ArticleContent>
            <RelatedArticles
              relatedArticles={featuredArticle}
              blogType="studentBlog"
              id={posts.id}
            />
            <DummyAdArea>
              <DummyAdText>広告</DummyAdText>
            </DummyAdArea>
          </Article>
          <FeaturedSection featuredArticle={featuredArticle} />
        </ArticlesContainer>
      </ContentWrapper>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:1337/posts");
  const posts = res.data as ArticleData[];
  return {
    paths: posts.map((article) => ({
      params: { id: String(article.id) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const res = await axios.get(`http://localhost:1337/posts/${id}`);
  const articles = await axios.get("http://localhost:1337/posts/");

  const posts: ArticleData = res.data;
  const featuredArticle = articles.data;

  return {
    props: { posts, featuredArticle },
  };
};

const ArticlesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.primary.black};
  ${mediaQuery.md`
    margin-top: 16px;
    font-size: ${({ theme }) => theme.fontSizes.large};
  `}
`;

const Article = styled.article`
  width: 60%;
  margin: 0 auto;
  ${mediaQuery.md`
    width: 95%;
  `}
`;

const TagAndDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 72px;
  margin-bottom: 4px;
`;

const TagContainer = styled.div`
  display: flex;
`;

const Tag = styled.p`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  color: ${({ theme }) => theme.colors.primary.white};
  background: ${({ theme }) => theme.colors.primary.blue};
  border-radius: 30px;
  padding: 4px 12px;
  margin: 0 8px 4px 0;
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normalS};
  color: ${({ theme }) => theme.colors.primary.gray};
  ${mediaQuery.sm`
    font-size: ${({ theme }) => theme.fontSizes.small};
    padding: 3px 0;
  `}
`;

const MainVisualContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 64px 0;
  ${mediaQuery.sm`
    margin: 32px 0;
  `}
  > img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
  }
`;

const DummyAdArea = styled.div`
  display: grid;
  place-items: center;
`;

const DummyAdText = styled.p`
  width: 90%;
  height: 90px;
  background: #c4c4c4;
  display: grid;
  place-items: center;
  ${mediaQuery.sm`
     width: 100%;
     height: 280px;
  `}
`;

const ArticleContent = styled.section`
  white-space: pre-wrap;
  margin-top: 56px;
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.large};
    color: ${({ theme }) => theme.colors.primary.black};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.blue};
    padding-bottom: 8px;
    ${mediaQuery.sm`
      font-size: ${({ theme }) => theme.fontSizes.large};
    `}
  }
  h1,
  h2,
  h3,
  h4 {
    margin-top: 16px;
  }
  ul,
  ol {
    list-style: inside;
    line-height: 1;
  }
  li {
    line-height: 1.5;
    text-indent: -1.4em;
    padding-left: 1.4em;
  }
  a {
    color: ${({ theme }) => theme.colors.primary.link};
  }
  p {
    color: ${({ theme }) => theme.colors.secondary.gray};
  }
`;

export default studentBlogPage;
