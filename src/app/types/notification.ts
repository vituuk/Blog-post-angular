import { MongoObject } from './mongo-object';

export interface NotificationProps extends MongoObject {
  type: 'comment' | 'like' | 'reply' | string;
  blog: MongoObject;
  notification_for: MongoObject;
  user: MongoObject;
  comment: MongoObject;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
