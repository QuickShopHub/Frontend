import {Component, inject, Input} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {App} from '../app';
import {SearchPage} from '../pages/search-page/search-page';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-field',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss'
})
export class SearchField {
  router = inject(Router);
  auth = inject(AuthService);
  isAuth = false;

  @Input() searchText: string | undefined;


  constructor() {
    this.isAuth = this.auth.token != null;
  }

  query: string = '';


  ngOnInit() {
    // Инициализируем query значением searchText, если оно определено
    if (this.searchText) {
      this.query = this.searchText;
    }
  }



  search(){
    this.router.navigate(['/find'], {
      queryParams: { query: this.query }
    });
  }
  isOpen = false

  menu(){
    this.isOpen = !this.isOpen;
  }

  log(){
    if(this.isAuth){
      this.auth.token = null;
      this.isAuth = false;
      this.auth.user = null;
      this.auth.logout();
    }
    this.router.navigate(['/auth/sign_in']);
  }
}
