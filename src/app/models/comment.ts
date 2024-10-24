import { Post } from './post';
import { User } from './user';

export class Comment {
  _id: string;
  author: string | User;
  post: string | Post;
  content: string;
  likesCount: number;
  likes: string[];
  dislikes: string[];
  parentComment: string | Comment;
  mentionedUsers: string[] | User[];
  createdAt: Date;
  updatedAt: Date;
}
