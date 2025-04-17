import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';
import { APP_IMPORTS } from '../../../app.config';
import { Post } from '../../../models/post';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  imports: APP_IMPORTS,
})
export class CommentsComponent implements OnInit {
  @Input() post: Post;
  comments: Comment[] = [];
  commentForm: FormGroup;

  mentionConfig = {
    mentions: [
      {
        items: ['user1', 'user2', 'user3'], // Replace with actual user data
        triggerChar: '@',
        labelKey: 'name',
      },
    ],
  };

  constructor(
    private _fb: FormBuilder,
    private _commentService: CommentService,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.commentForm = this._fb.group({
      content: [''],
    });
    this.loadComments();
  }

  loadComments(): void {
    this._commentService.findByPost(this.post._id).subscribe((comments) => {
      this.comments = comments;
    });
  }

  postComment(): void {
    const comment = {
      content: this.commentForm.value.content,
      post: this.post._id,
      author: this._authService.getUserId(),
    };
    this._commentService.create(comment).subscribe(() => {
      this.loadComments();
      this.commentForm.reset();
    });
  }

  isUser(author): author is User {
    return (author as User).username !== undefined;
  }
}
