import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../auth/auth-service';
import {ActivatedRoute, Router} from '@angular/router';


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
  route: ActivatedRoute = inject(ActivatedRoute);
  isOpen = false

  @Input() searchText: string | undefined;


  constructor() {
    this.isAuth = this.auth.token != null;
  }

  query: string = "";


  ngOnInit() {
    if(!this.searchText){
      this.searchText = ""
    }
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      if(!this.query){
        if(localStorage.getItem("query") != null){
          this.query = localStorage.getItem("query")!;
        }
      }
    })
    if (this.searchText) {
      this.query = this.searchText;
    }
  }

  search(){
    localStorage.setItem("query", this.query)
    this.router.navigate(['/find'], {
      queryParams: { query: this.query }
    });
  }



  menu(){
    this.isOpen = !this.isOpen;
  }

  log(){
    if(this.isAuth){
      this.auth.logout();
      this.isAuth = false;
    }
    this.router.navigate(['/auth/sign_in']);
  }

  backPage(){
    localStorage.removeItem("query")
    this.router.navigate(['/find'], {
      queryParams: { query: "" }
    });
  }

  favorites(){
    this.router.navigate(['/some-elements'], {
      queryParams: { page: "favorites" }
    });
  }

  basket(){
    this.router.navigate(['/some-elements'], {
      queryParams: { page: "buy" }
    });
  }

}
