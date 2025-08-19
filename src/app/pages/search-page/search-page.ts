import {Component, inject} from '@angular/core';
import {ProductCard} from "../../product-card/product-card";
import {SearchField} from "../../search-field/search-field";
import {CardService} from '../../data/services/cardService';
import {ProductPage} from '../product-page/product-page';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchFieldService} from '../../data/services/searchFieldService';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [
    ProductCard,
    SearchField,
    FormsModule
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  router = inject(Router);
  cardService = inject(CardService);
  page: number = 1
  cards: Product[] | null = null;

  result: ApiResponse | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
  }

  searchQuery: string = "";

  ngOnInit() {
    const strPage: string | null = localStorage.getItem("page")
    if(strPage != null){
      this.page = parseInt(strPage)
    }
    else{
      this.page = 1
    }
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchQuery = query;
        this.search(query, this.page);
      }
    });
  }

  public search(query: string, page: number = 1): void {
    this.result = undefined;
    this.cardService.getProducts(query, page).subscribe(val => {
      this.result = val;
      this.cards = this.result!._embedded.productForSearchList
    });

  }

  public getCard(card: Product) {
    localStorage.setItem('query', this.searchQuery);
    this.router.navigate(['/result'], {
      queryParams: { id: card.id, url: card.url }
    });
  }

  forward(){
    if(this.result && this.result.page.totalPages > this.page) {
      this.page += 1
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)
    }
  }

  back(){
    if(this.page > 1) {
      this.page -= 1
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)

    }
  }

  setPage(){
    if(this.result) {
      if (this.page > this.result.page.totalPages) {
        this.page = this.result.page.totalPages;
      } else if (this.page < 1) {
        this.page = 1
      }
      localStorage.setItem('page', this.page.toString());
      this.search(this.searchQuery, this.page)
    }
  }

}
