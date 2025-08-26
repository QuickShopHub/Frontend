import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Profile} from './pages/profile/profile';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Profile
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
