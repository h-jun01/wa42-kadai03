import { NextPage, GetStaticProps } from "next";
import { ArticleData } from "@src/models/articleData";
import { HomeSection } from "@src/components/section/HomeSection";
import { PageSEO } from "@src/components/seo/PageSEO";
import { mediaQuery } from "@src/styles/mediaQuery";
import { styledTheme } from "@src/styles/styledTheme";
import axios from "axios";
import styled from "styled-components";

type Props = {
  featuredArticle: ArticleData[];
  teacherArticle: ArticleData[];
  studentArticle: ArticleData[];
};

const Page: NextPage<Props> = ({
  featuredArticle,
  teacherArticle,
  studentArticle,
}) => {
  return (
    <>
      <PageSEO
        title="HAL Blog"
        description="HALのブログ"
        ogImageUrl="https://user-images.githubusercontent.com/50396652/131574150-4f0624ec-152e-40d9-8efa-252acf1e5d7d.jpeg"
      />
      <main>
        <MainVisualContainer>
          <img src="/images/main_visual.jpeg" alt="main_visual" />
        </MainVisualContainer>
        <ArticleWrapper>
          <HomeSection
            heading="注目記事"
            blogType="featuredBlog"
            bgcolor={styledTheme.colors.primary.red}
            articleData={featuredArticle}
          />
          <HomeSection
            heading="生徒ブログ"
            blogType="studentBlog"
            bgcolor={styledTheme.colors.primary.blue}
            articleData={studentArticle}
          />
          <HomeSection
            heading="教師ブログ"
            blogType="teacherBlog"
            bgcolor={styledTheme.colors.primary.green}
            articleData={teacherArticle}
          />
        </ArticleWrapper>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:1337/posts/");
  const posts = res.data as ArticleData[];

  const featuredArticle = posts.slice(0, 3);
  const teacherArticle = posts
    .filter((value) => value.category.slug === "teacher")
    .slice(0, 3);
  const studentArticle = posts
    .filter((value) => value.category.slug === "student")
    .slice(0, 3);

  return {
    props: {
      featuredArticle,
      teacherArticle,
      studentArticle,
    },
  };
};

const ArticleWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  ${mediaQuery.sm`
    width: 85%;
  `}
`;

const MainVisualContainer = styled.div`
  width: 100%;
  > img {
    width: 100%;
    object-fit: cover;
  }
  ${mediaQuery.md`
    > img {
      height: 100vh;
    }
    height: 100vh;
  `}
`;

export default Page;
