import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(token: string) {
    return localStorage.setItem('User', JSON.stringify(token))
  }

  getLocalStorage() { 
    return localStorage.getItem('User');
  }

  getUserId() {
    const tokenData = localStorage.getItem('User');
    const payload = tokenData!.split('.')[1];
    const userId =  JSON.parse(atob(payload)).id;
    return userId;
  }
}
