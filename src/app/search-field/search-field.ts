import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {App} from '../app';
import {SearchPage} from '../pages/search-page/search-page';

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

  search_page = inject(SearchPage)

  search(){
    this.search_page.search(this.query)
  }

}
