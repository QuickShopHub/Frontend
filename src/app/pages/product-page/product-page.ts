import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {SearchField} from '../../search-field/search-field';
import {SearchFieldService} from '../../data/services/searchFieldService';
import {MiniPhoto} from '../../mini-photo/mini-photo';
import {PhotoService} from '../../data/services/photo-service';
import {AuthService} from '../../auth/auth-service';

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
  urlAvatar: string | null = null;
  data: ForCustomer | null = null;
  http:HttpClient = inject(HttpClient);
  photoService = inject(PhotoService);
  auth = inject(AuthService);

  url: string | null = null;

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
    this.urlAvatar = url;
    this.url = url
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

  changePhoto(url: string){
    this.url = url
  }

}
