import {Component, inject} from '@angular/core';
import {ProductCard} from "../../product-card/product-card";
import {SearchField} from "../../search-field/search-field";
import {CardService} from '../../data/services/cardService';

@Component({
  selector: 'app-search-page',
    imports: [
        ProductCard,
        SearchField
    ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
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

  public getCard(card: Product) {
    console.log(card.id);
  }
}
