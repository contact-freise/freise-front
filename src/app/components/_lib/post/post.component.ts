import { Component, Input, OnInit } from '@angular/core';
import { appImports } from '../../../app.config';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { take } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import * as _ from 'lodash';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: true,
    imports: appImports,
})
export class PostComponent implements OnInit {

    likesCount: number;
    dislikesCount: number;

    alreadyLiked = false;
    alreadyDisliked = false;

    @Input() post: Post;

    constructor(
        private _postService: PostService,
        private _authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.likesCount = this.post.likesCount;
        this.dislikesCount = this.post.dislikesCount;

        this._authService.user$.subscribe(user => {
            this.alreadyLiked = _.intersection(this.post.likes, user.likes).length > 0;
            this.alreadyDisliked = _.intersection(this.post.dislikes, user.dislikes).length > 0;
        });
    }

    likeDislikeChanged(event) {
        if (event.value === 'like') {
            this.like(this.post);
            if(this.alreadyDisliked) {
                this.undislike(this.post);
            }
        }
        if (event.value === 'dislike') {
            this.dislike(this.post);
            if(this.alreadyLiked) {
                this.unlike(this.post);
            }
        }
    }

    like(post: Post) {
        this._postService.like(post._id).pipe(take(1))
            .subscribe(() => {
                this.likesCount++;
                this.alreadyLiked = true;
            });
    }

    unlike(post: Post) {
        this._postService.like(post._id).pipe(take(1))
            .subscribe(() => {
                this.likesCount--;
                this.alreadyLiked = false;
            });
    }

    dislike(post: Post) {
        this._postService.dislike(post._id).pipe(take(1))
            .subscribe(() => {
                this.dislikesCount++;
                this.alreadyDisliked = true;
            });
    }

    undislike(post: Post) {
        this._postService.dislike(post._id).pipe(take(1))
            .subscribe(() => {
                this.dislikesCount--;
                this.alreadyDisliked = false;
            });
    }

    comment(post: Post) {
    }
}