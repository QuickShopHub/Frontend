import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {

  data: Product | null = null;
  url: string | null = null;
  http = inject(HttpClient);

  constructor(private router: Router) {}

  public createPage(id:string, url:string):void {
    this.http.get<Product>(`/product/api/products/id?id=${id}`).subscribe(value => {
      this.data = value;
    })
    this.url = url;
  }


}
