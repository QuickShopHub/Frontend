import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {App} from '../app';

@Component({
  selector: 'app-search-field',
  imports: [
    FormsModule
  ],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss'
})
export class SearchField {

  query: string = '';

  app = inject(App)

  search(){
    this.app.search(this.query)
  }

}
