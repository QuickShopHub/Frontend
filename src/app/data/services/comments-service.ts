import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewCommentDTO} from '../DTO/NewCommentDTO';
import {AuthService} from '../../auth/auth-service';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  http = inject(HttpClient)
  auth = inject(AuthService)

  public sendComment(comment: NewCommentDTO) {
    this.http.post("/comment/api/new_comment", comment, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    }).subscribe();
  }

  public getAllComments(id: string) {
    return this.http.get<CommentData[]>(`/comment/api/comments?id=${id}`);
  }

  public deleteComment(id: string) {
    return this.http.delete<CommentData[]>(`/comment/api/comments/${id}`, {
      headers: {
        "Authorization": `Bearer ${this.auth.token}`
      }
    });
  }

}
