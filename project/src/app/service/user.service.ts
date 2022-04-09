import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(
    private http: HttpClient,
    private sStorage: LocalStorageService
    ) { }

  registerUser(user: IRegisterUser): Observable<any> {
    return this.http.post<IRegisterUser>(`${environment.baseUrl}user/register`, user);
  }
  
  loginUser(loginData?: {email: string; password: string}) {
    return this.http.post<any>(`${environment.baseUrl}user/login`, loginData);
  }

  updateUserData(userId: string, data: Object) {
    return this.http.put<any>(`${environment.baseUrl}user/${userId}`, data, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    });
  }

  updateUserInfo(userId: string, data: Object) {
    return this.http.put<any>(`${environment.baseUrl}user/${userId}/info`, data);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}user/${id}`, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    })
  }

  deleteElement(userId: string, elementId: string, elementType: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}user/${userId}/${elementType}/${elementId}/delete`, {}, {
      headers: new HttpHeaders({'Autorization': `Bearer ${this.sStorage.getLocalStorage()}`})
    })
  }
}