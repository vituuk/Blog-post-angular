import {MongoObject} from './mongo-object';

export interface MenuItemModel extends MongoObject {
  title: Record<string, string>;
  route: string;
}
