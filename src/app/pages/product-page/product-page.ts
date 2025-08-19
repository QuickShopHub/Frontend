import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {SearchField} from '../../search-field/search-field';
import {SearchFieldService} from '../../data/services/searchFieldService';
import {MiniPhoto} from '../../mini-photo/mini-photo';
import {PhotoService} from '../../data/services/photo-service';

@Component({
  selector: 'app-product-page',
  imports: [
    SearchField,
    MiniPhoto
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  url: string | null = null;
  data: ForCustomer | null = null;
  http:HttpClient = inject(HttpClient);
  photoService = inject(PhotoService);

  photosUrl: miniPhoto[] | null = null;


  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const url = params['url'];
      if (id) {
        this.createCard(id, url);
      }
    });
  }

  public createCard(id:string, url:string):void {
    this.url = url;
    this.http.get<ForCustomer[]>(`/product/api/products/id?id=${id}`).subscribe(res => {
      this.data = res[0];
      this.addPhotos(this.data.id)
    });
  }

  private addPhotos(id: string){
    this.photoService.getPhotos(id).subscribe(res => {
      this.photosUrl = res;
    })
  }

}
