import {MongoObject} from './mongo-object';
import {StatusEnum} from './enums/status.enum';

export interface CategoryProps extends MongoObject {
  name_kh: string;
  name_en: string;
  status: StatusEnum;
  ordering: number;
  _active: boolean;
  _deleted: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  __v: number;
}
