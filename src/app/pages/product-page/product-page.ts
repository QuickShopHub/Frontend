import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchField} from '../../search-field/search-field';

import {MiniPhoto} from '../../mini-photo/mini-photo';
import {PhotoService} from '../../data/services/photo-service';
import {AuthService} from '../../auth/auth-service';
import {FormsModule} from '@angular/forms';
import {CommentsService} from '../../data/services/comments-service';
import {NewCommentDTO} from '../../data/DTO/NewCommentDTO';
import {AutoResizeDirective} from '../../data/services/AutoResizeDirective';
import {Comment} from '../../comment/comment';

@Component({
  selector: 'app-product-page',
  imports: [
    SearchField,
    MiniPhoto,
    FormsModule,
    AutoResizeDirective,
    Comment
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
  comments: CommentData[] = [];
  displayedComments: CommentData[] = []
  maxComm = 10
  canEdit: boolean = false;
  router = inject(Router);
  admin = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const url = params['url'];
      this.productId = id
      if (id) {
        this.createCard(id, url);
      }
      this.loadComments()
    });
  }

  public createCard(id:string, url:string):void {
    this.urlAvatar = url;
    this.url = url

    this.http.get<ForCustomer[]>(`/product/api/products/id?id=${id}`).subscribe(res => {
      this.data = res[0];
      this.addPhotos(this.data.id)
      if(this.auth.user != null) {

        if(this.auth.user.admin) {
          this.canEdit = true;
          this.admin = true;
        }
        else if(this.auth.user.id == this.data.idVendor) {
          this.canEdit = true;
        }
      }

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
      const newComment = new NewCommentDTO(this.comment, this.auth.user!.id, this.productId, this.auth.user!.username)
      this.commentsService.sendComment(newComment).subscribe(() => {
        window.location.reload();
      })
      this.displayedComments.unshift({id:"", comment:this.comment, userId:this.auth.user?.id!, createdAt:"", productId:this.productId, countLikes:0, username:this.auth.user?.username!})
      this.comments.unshift(this.displayedComments[0])
      this.comment = ""
    }
  }

  loadComments(){

    this.commentsService.getAllComments(this.productId!).subscribe(res => {
      this.comments = res
      this.comments = [...this.comments].reverse();
      this.displayedComments = this.comments.slice(0, this.maxComm)
    })
  }

  showMore(){
    this.maxComm+=10
    this.displayedComments = this.comments.slice(0, this.maxComm)
  }

  deleteProduct() {
    this.http.delete<string>(`/product/api/products?id=${this.productId}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      },
      observe: 'response'
    }).subscribe(response => {
      localStorage.removeItem('query');
      this.router.navigate(['/find'], {
        queryParams: { query: "" },
      });
    }, error => {
      console.error('Ошибка при удалении продукта:', error);
    });
  }

}
