import { MongoObject } from './mongo-object';

export interface PersonalInfo {
  fullName: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  profile_img: string;
}

export interface SocialLinks {
  youtube: string;
  facebook: string;
  twitter: string;
  github: string;
  instagram: string;
  website: string;
}

export interface AccountInfo {
  total_posts: number;
  total_reads: number;
}

export interface UserProps extends MongoObject {
  personal_info: PersonalInfo;
  social_links: SocialLinks;
  account_info: AccountInfo;
  google_auth: boolean;
  blogs: MongoObject[];
  joinedAt?: string;
  updatedAt?: string;
  __v?: number;
}
