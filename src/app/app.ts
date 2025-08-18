import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CreateProduct} from './create-product/create-product';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateProduct
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
