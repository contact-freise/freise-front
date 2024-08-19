import { Post } from './post';
import { User } from './user';

export class Like {
  _id: string;
  post: Post;
  user: User;
  type: 'like' | 'dislike';
}
