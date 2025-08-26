import { Component } from '@angular/core';
import {SearchField} from '../../search-field/search-field';

@Component({
  selector: 'app-profile',
  imports: [
    SearchField
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

}
