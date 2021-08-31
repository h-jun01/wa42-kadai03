export type ArticleData = {
  id: number;
  title: string;
  body: string;
  media: { url: string; width: number };
  summary: string;
  createdAt: Date;
  category: {
    name: string;
    slug: string;
  };
  created_at: Date;
  updated_at: Date;
};
