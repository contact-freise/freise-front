import { User } from "./user";

export class Post {
    _id: string;
    author: string | User;
    title: string;
    content: string;
    tags: string[];
    imageUrl: string;
}