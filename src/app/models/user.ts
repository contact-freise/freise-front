export class User {
  _id: string;
  username: string;
  email: string;
  about: string;
  dob: Date;
  age: number;
  location: string;
  gender: string;
  avatarUrl: string;
  backgroundUrl: string;

  followers: string[];
  following: string[];
  notifications: string[];

  posts: string[];
  comments: string[];

  messages: string[];
  conversations: string[];

  likes: string[];
  dislikes: string[];
}
