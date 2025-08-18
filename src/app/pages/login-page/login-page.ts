import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {

  public errorMessage: string = "";

  form = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  })

  constructor(private router: Router) {}

  public back(){
    this.router.navigate(['/find'])
  }


}
