import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { APP_IMPORTS } from '../../../app.config';
import { PaginatedResult } from '../../../models/_utils/paginated-result';
import { SCROLL_LIMIT } from '../../../app.const';
import { finalize } from 'rxjs';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class PostsComponent {
  @Input() posts: PaginatedResult<Post> = {
    data: [],
    total: 0,
    page: 1,
    limit: SCROLL_LIMIT,
  };
  @Input() author: string;
  @Input() isPicture: boolean;

  limit = SCROLL_LIMIT;
  throttle = 300;
  scrollDistance = 1;
  isLoading = false;

  constructor(private _postSevice: PostService) {}

  onScroll() {
    if (this.isLoading) return;
    if (this.posts.data.length >= this.posts.total && this.posts.total !== 0)
      return;

    this.isLoading = true;
    this._postSevice
      .getByAuthor(this.author, this.isPicture, this.posts.page + 1, this.limit)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((res) => {
        this.posts.data.push(...res.data);
        this.posts.page++;
      });
  }
}
