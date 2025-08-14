import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductCard} from './product-card/product-card';
import {CardService} from './data/services/cardService';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {ProductPage} from './product-page/product-page';


@Component({
  selector: 'app-root',
  imports: [ProductCard, ProductPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ozon');

  cardService = inject(CardService);

  cards: ApiResponse | undefined;

  constructor() {
    this.cardService.getProducts().subscribe(val => {
      this.cards = val;
    });
  }

}
