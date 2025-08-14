import {Component, inject, signal} from '@angular/core';
import {ProductCard} from './product-card/product-card';
import {CardService} from './data/services/cardService';
import {SearchField} from './search-field/search-field';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {ProductPage} from './product-page/product-page';


@Component({
  selector: 'app-root',
  imports: [ProductCard, SearchField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ozon');

  cardService = inject(CardService);

  cards: ApiResponse | undefined;

  constructor() {
  }

  public search(query: string) {
    this.cards = undefined;
    this.cardService.getProducts(query).subscribe(val => {
      this.cards = val;
    });
  }

}
