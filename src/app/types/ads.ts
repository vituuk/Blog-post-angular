import {MongoObject} from './mongo-object';

type AdsPlacementProps = 'top_homepage' | 'bottom_homepage' | 'top_detail_page' | 'bottom_detail_page' | 'right_homepage' | 'left_homepage' | 'right_detail_page' | 'left_detail_page';

export interface AdsProps extends MongoObject {
  image: string;
  placement_location: AdsPlacementProps;
  target_link: string;
  title: string;
}
