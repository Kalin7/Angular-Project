import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';


export interface IArticle {
  title: string;
  content: string;
  imgUrl: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(
    private http: HttpClient,
    private sStorage: LocalStorageService,
    ) { }

  createArticle(article:any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}create/article`, article, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}` }),
    });
  }

  getHomePageArticles(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseUrl}articles`)
                    .pipe(map((articles: any[]) => {
                      return articles.slice(0, 4)
                    }));
  };

  getAllArticles(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseUrl}articles`, {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }; 

  addArticlePost(id: string, data: Object): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}article/${id}/update`, data, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`}),
    });
  }

  getArticleById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}article/${id}/posts`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    }); 
  }

  deleteArticleById(id: string, authorId: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}article/${id}/${authorId}/delete`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})    
    });
  };
}
