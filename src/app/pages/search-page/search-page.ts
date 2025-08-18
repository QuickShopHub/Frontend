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
  cardService = inject(CardService);
  productPage = inject(ProductPage);


  card: ApiResponse | undefined;

  constructor(private router: Router) {}

  public search(query: string) {
    this.card = undefined;
    this.cardService.getProducts(query).subscribe(val => {
      this.card = val;
    });
  }

  public getCard(card: ProductToSearch) {
    this.productPage.createPage(card.id, card.url);
    this.router.navigate(['/product'])
  }
}
