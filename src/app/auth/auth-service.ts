import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './User';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  public token :String | null = null;
  public user :User|null = null;

  constructor(private router: Router) {
    // Загрузка токена и пользователя из localStorage при инициализации
    this.loadFromLocalStorage();
  }
  private loadFromLocalStorage(){
    this.token = localStorage.getItem("token");
    const userData = localStorage.getItem('user_data');
    this.user = userData ? JSON.parse(userData) : null;
  }

  public signin(payload: {email: string, password: string}){
    return  this.http.post<UserAuth>('/user/api/auth/login', payload)
  }

  public signup(payload: {email: string, password: string, username: string}) {
    return this.http.post<UserAuth>('/user/api/auth/signup', payload);
  }

  public logout() {
    console.log('logged out');
    return this.http.post('/user/api/auth/logout', {}, { withCredentials: true } ).subscribe(
      response => {
        this.token = null;
        this.user = null;
        localStorage.removeItem("query");
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
      },
      error => {
        console.error('Logout error', error);  // Поймать и отобразить возможные ошибки
      }
    );
  }


}
