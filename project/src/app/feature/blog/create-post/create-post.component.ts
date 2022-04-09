import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from 'src/app/service/article.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm = new FormGroup({
    content: new FormControl(null, [Validators.required, Validators.minLength(5)])
  })

  post?: Object = {}
  articleId?: string;
  userId?: string;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private library: FaIconLibrary,
    private sPost: PostService,
    private sArticle: ArticleService,
    private sStorage: LocalStorageService,
    private sUser: UserService
    ) {
      this.library.addIcons(faComments)
    }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    this.userId = this.sStorage.getUserId()
  }

  postData() {
    return {
      content: this.postForm.get('content')?.value,
      author: this.userId,
      article: this.articleId
    }
  }

  onSubmit(): void {
    if (!this.postForm.valid) {
      return;
    }
    this.post = this.postData();

    this.sPost
        .createPost(this.post)
        .subscribe((res) => {
          this.sArticle.addArticlePost(this.articleId!, {id: res._id}).subscribe();
          this.sUser.updateUserData(this.userId!, {dataType: 'post', id: res._id}).subscribe();
        });

    this.postForm.reset();
    this.router.navigate([`/feature/blog/posts/${this.articleId}`])
  }
  
}
