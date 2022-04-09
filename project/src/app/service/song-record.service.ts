import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';


export interface IRecord {
  _id: string;
  title: string;
  genre: string;
  description: string;
  songUrl: string;
  rating: number;
  author: {
    firstName: string,
    lastName: string,
    imgUrl: string
    email: string,
    phone: string,
    about: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class SongRecordService {

  constructor(
    private http: HttpClient,
    private sStorage: LocalStorageService
    ) { }


  createRecord(data: any): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}record`, data, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }

  getHomePageRecords() : Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}records`)
                    .pipe(map((records: any[]) => {
                      return records.slice(0, 4)
                    }))

  }

  getAllRecords(): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`${environment.baseUrl}records`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    })
  }

  getRecordById(id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`${environment.baseUrl}records/${id}`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }

  voteForRecordById(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}records/${id}/${status}`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }
}
