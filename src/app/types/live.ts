import {MongoObject} from './mongo-object';

export interface LiveProps extends MongoObject {
  title: string;
  thumbnail: string;
  url: string;
}
