import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];
  articleId?: string;
  constructor(
    private sPost: PostService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['articleId']
    this.sPost
        .getPosts(this.articleId!)
        .subscribe({
          next: (res) => {
            this.posts = res
          },
          error: (err) =>
            alert(err)
        })
  }

  goBack(): void {
    this.router.navigate(['/feature/blog'])
  }

}
