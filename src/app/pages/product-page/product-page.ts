import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  url: string | null = null;
  data: ForCustomer | null = null;
  http:HttpClient = inject(HttpClient);

  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('params');
      const id = params['id'];
      const url = params['url'];
      if (id) {
        this.createCard(id, url);
      }
    });
  }

  public createCard(id:string, url:string):void {
    this.url = url;
    this.http.get<ForCustomer>(`/product/api/products/id?id=${id}`).subscribe(res => {
      this.data = res;
    });
  }
}
