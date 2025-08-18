import {Component, inject} from '@angular/core';
import {ProductCard} from "../../product-card/product-card";
import {SearchField} from "../../search-field/search-field";
import {CardService} from '../../data/services/cardService';
import {ProductPage} from '../product-page/product-page';
import {Router} from '@angular/router';

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
  router = inject(Router);
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
    this.router.navigate(['/product'], {
      queryParams: { id: card.id, url: card.url }
    });

  }
}
