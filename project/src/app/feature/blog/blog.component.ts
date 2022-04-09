import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  details: boolean = false;
  btn?: string = "Show more";

  articles?: any[] = [];
  posts: any[] = [];
  subscriber?: Subscription
  constructor(
    private sArticle: ArticleService,
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.sArticle
        .getAllArticles()
        .subscribe({
          next: (res) => {
            this.articles = res;
          },
          error: (err) => {
            alert(err);
          }
        })
  }

  getArticlePosts(id: string) {
    this.subscriber = this.sArticle
        .getArticleById(id)
        .subscribe({
          next: (res) => {
            this.posts = res
          },
          error: (err) => {
            alert(err.message);
          }
        })
  }

  onShow(event: Event): void {
    const e = event.target as HTMLElement;
    this.articles?.forEach((a) => {
      if (a._id == e.id) {
        this.details = !this.details;
        this.details ? a.details = true : a.details = false;
      }
      
    })
    this.details ? e.textContent = 'Hide' : e.textContent = 'Show more'
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }
}
