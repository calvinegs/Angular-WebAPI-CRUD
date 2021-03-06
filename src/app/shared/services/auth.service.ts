import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../helpers/appSettings';

const API_URL = AppSettings.API_URL + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'signin', {
      password,
      username,
    })
  }
  
  register(username: string, email:string, password: string): Observable<any> {
    return this.http.post(API_URL + 'signup', {
      username,
      email,
      password
    })
  }
}
