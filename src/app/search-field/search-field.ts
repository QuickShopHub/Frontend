import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth/auth-service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-field',
  imports: [
    FormsModule
  ],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss'
})
export class SearchField {
  router = inject(Router);
  auth = inject(AuthService);
  isAuth = false;
  route: ActivatedRoute = inject(ActivatedRoute);

  @Input() searchText: string = "";


  constructor() {

  }

  query: string = "";


  ngOnInit() {

    this.isAuth = this.auth.token != null;
    console.log("auth: "+this.isAuth)
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
      else{
        this.query = ""
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


  backPage(){
    localStorage.removeItem("query")
    this.router.navigate(['/find'], {
      queryParams: { query: "" }
    });
  }

  favorites(){
    if(this.auth.token != null) {
      this.router.navigate(['/some-elements'], {
        queryParams: {page: "favorites"}
      });
    }
  }

  basket(){
    if(this.auth.token != null) {
      this.router.navigate(['/some-elements'], {
        queryParams: {page: "buy"}
      });
    }
  }

  move(){
    if(this.auth.token != null){
      console.log(111)
      this.router.navigate(['/my_profile'], {})
    }
    else{
      this.router.navigate(['/auth/sign_in'], {})
    }
  }

}
