import { MongoObject } from './mongo-object';

export interface CommentProps extends MongoObject {
  blog_id: MongoObject;
  blog_author: MongoObject;
  comment: string;
  children: MongoObject[];
  commented_by: MongoObject;
  isReply: boolean;
  commentedAt: string;
  updatedAt: string;
  __v: number;
}
