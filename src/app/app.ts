import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductCard} from './product-card/product-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ozon');
}
