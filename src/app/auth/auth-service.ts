import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './User';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  public tokenSubject = new BehaviorSubject<string | null>(null);
  public token :string | null = null;
  public user :User|null = null;




  public signin(payload: {email: string, password: string}){
    return  this.http.post<UserAuth>('/user/api/auth/login', payload)
  }

  public signup(payload: {email: string, password: string, username: string}) {
    return this.http.post<UserAuth>('/user/api/auth/signup', payload);
  }

  public logout() {
    console.log('logged out');
    localStorage.removeItem("query");
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.token = null;
    this.user = null;
    this.http.post('/user/api/auth/logout', {}, { withCredentials: true } ).subscribe(
      () => {

      }
    );
  }

  public refreshToken() {
    return this.http.post<UserAuth>('/user/api/auth/refresh', {})
  }


}
