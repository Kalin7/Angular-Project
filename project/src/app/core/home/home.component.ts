import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { ArticleService, IArticle } from '../../service/article.service';
import { IRecord, SongRecordService } from '../../service/song-record.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: IArticle[] = [];
  records: IRecord[] = [];
  constructor(
    private sArticle: ArticleService,
    private sRecords: SongRecordService,
    private library: FaIconLibrary
    ) {
      this.library.addIcons(faMusic);
    }

  ngOnInit(): void {
    this.getArticles();
    this.getFourRecords();
  }

  getArticles() {
    this.sArticle
        .getHomePageArticles()
        .subscribe({
            next: (res) => {
              
              this.articles = res;
            },
            error: (err) => {
              alert(err.message);
            }
        })
  }

  getFourRecords() {
    this.sRecords
        .getHomePageRecords()
        .subscribe({
          next: (res) => {
            this.records = res;
          },
          error: (err) => {
            alert(err);
          }
        })
  }

}

