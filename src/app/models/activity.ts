import { Post } from './post';
import { User } from './user';

export class Activity {
  _id: string;
  user: User;
  mentionnedUser: User;
  post: Post;
  action: {
    name: string;
    activityType: string;
  };
  createdAt: Date;
}
