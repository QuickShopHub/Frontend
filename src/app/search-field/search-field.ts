import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../auth/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchFieldService} from '../data/services/searchFieldService';

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
  searchFieldService = inject(SearchFieldService);
  route: ActivatedRoute = inject(ActivatedRoute);

  @Input() searchText: string | undefined;


  constructor() {
    this.isAuth = this.auth.token != null;
  }

  query: string = '';


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchFieldService.query = params['query'];
      if(!this.searchFieldService.query){
        this.searchFieldService.query = localStorage.getItem('query')
      }
    })
    if (this.searchText) {
      this.query = this.searchText;
    } else if(this.searchFieldService.query != null) {
      this.query = this.searchFieldService.query;
    }
  }

  search(){
    localStorage.setItem("query", this.query)
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
