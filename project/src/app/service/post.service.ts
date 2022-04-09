import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private sStorage: LocalStorageService
    ) { }

  createPost(data: Object): Observable<any> {
    return this.http.post(`${environment.baseUrl}create/post`, data, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`}),
    })
  }

  getPosts(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}posts/${id}`,{
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }
}
