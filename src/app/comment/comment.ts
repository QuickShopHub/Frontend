import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class Comment {
  @Input() comment!: CommentData;
}
