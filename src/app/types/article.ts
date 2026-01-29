import { MongoObject } from './mongo-object';
import { CategoryProps } from './category';
import { AdsProps } from './ads';

export interface ArticleActivity {
  total_likes: number;
  total_comments: number;
  total_reads: number;
  total_parent_comments: number;
}

export interface ArticleAuthor extends MongoObject {
  name: string;
  avatar: string;
}

export interface ArticleProps extends MongoObject {
  blog_id: string;
  title: string;
  banner?: string;
  des: string;
  content?: string[];
  tags?: string[];
  author?: ArticleAuthor;
  activity?: ArticleActivity;
  category: CategoryProps;
  published_at: string;
  comments?: MongoObject[];
  draft?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  __v?: number;
  slug?: string;
  thumbnail?: string;
  url?: string;
  images?: string[];
}

export interface SectionArticleProps {
  category: CategoryProps;
  articles: ArticleProps[];
}

export interface DetailArticleProps {
  ads: AdsProps[];
  article: ArticleProps;
  related_articles: ArticleProps[];
}
