import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {SearchField} from '../../search-field/search-field';
import {SearchFieldService} from '../../data/services/searchFieldService';
import {MiniPhoto} from '../../mini-photo/mini-photo';
import {PhotoService} from '../../data/services/photo-service';
import {AuthService} from '../../auth/auth-service';
import {FormsModule} from '@angular/forms';
import {CommentsService} from '../../data/services/comments-service';
import {NewCommentDTO} from '../../data/DTO/NewCommentDTO';
import {AutoResizeDirective} from '../../data/services/AutoResizeDirective';

@Component({
  selector: 'app-product-page',
  imports: [
    SearchField,
    MiniPhoto,
    FormsModule,
    AutoResizeDirective
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
  comment: string | null = null;
  commentsService = inject(CommentsService);
  productId: string | null = null;
  url: string | null = null;

  photosUrl: miniPhoto[] | null = null;


  route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const url = params['url'];
      this.productId = id
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

  sendComment(){
    if(this.comment && this.productId) {
      console.log(2)
      const newComment = new NewCommentDTO(this.comment, this.auth.user!.id, this.productId, this.auth.user!.username)
      this.commentsService.sendComment(newComment)
    }
  }

}
