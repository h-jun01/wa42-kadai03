import { FC } from "react";
import { formatDate } from "@src/utils/formatDate";
import { ArticleData } from "@src/models/articleData";
import styled, { css } from "styled-components";
import Link from "next/link";

type CardItem = Omit<ArticleData, "createdAt" | "created_at">;

type Props = {
  blogType: "teacherBlog" | "studentBlog" | "featuredBlog";
} & CardItem;

export const ArticleCard: FC<Props> = ({
  id,
  title,
  media,
  summary,
  updated_at,
  category,
  blogType,
}) => {
  return (
    <Card>
      <Link
        href={`/${blogType}/article/[id]`}
        as={`/${blogType}/article/${id}`}
      >
        <a>
          <CardImageFrame url={media.url} />
          <CardTextBox>
            <CardTagContainer>
              <CardTag tagType={blogType}>{category.name}</CardTag>
            </CardTagContainer>
            <FlexContainer>
              <CardTitle>{title}</CardTitle>
              <CardSummary>{summary}</CardSummary>
            </FlexContainer>
            <CardDate>{formatDate(updated_at)}</CardDate>
          </CardTextBox>
        </a>
      </Link>
    </Card>
  );
};

const Card = styled.div`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
  border-radius: 15px;
  overflow: auto;
  min-width: 0;
  margin-bottom: 16px;
`;

const CardImageFrame = styled.div<{ url: string }>`
  width: 100%;
  height: 190px;
  ${({ url }) =>
    css`
      background: url(${`http://localhost:1337${url}`}) no-repeat center;
    `}
  background-size: cover;
`;

const CardTextBox = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 280px;
  padding: 16px;
`;

const FlexContainer = styled.div`
  flex: 1;
`;

const CardTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardTag = styled.p<{ tagType: string }>`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xSmall};
  color: ${({ theme }) => theme.colors.primary.white};
  ${({ tagType }) =>
    tagType === "teacherBlog"
      ? css`
          background: ${({ theme }) => theme.colors.primary.green};
        `
      : tagType === "studentBlog"
      ? css`
          background: ${({ theme }) => theme.colors.primary.blue};
        `
      : tagType === "featuredBlog"
      ? css`
          background: ${({ theme }) => theme.colors.primary.red};
        `
      : css`
          background: ${({ theme }) => theme.colors.primary.gray};
        `}
  border-radius: 30px;
  padding: 4px 12px;
  margin: 0 8px 4px 0;
`;

const CardTitle = styled.h3`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.normalL};
  margin-top: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 2;
  overflow: hidden;
`;

const CardSummary = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 5;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.secondary.gray};
  margin-top: 8px;
`;

const CardDate = styled.span`
  display: block;
  text-align: right;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.primary.gray};
  margin: 0 4px;
`;
