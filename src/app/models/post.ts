import { User } from './user';

export class Post {
  _id: string;
  author: string | User;
  title: string;
  content: string;
  mediaUrl: string;
  likesCount: number;
  likes: string[];
  dislikes: string[];
  dislikesCount: number;
  commentsCount: number;
  createdAt: Date;
}
