import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth-service';
import {User} from '../../auth/User';
import {LoginPage} from '../login-page/login-page';

@Component({
  selector: 'app-signin-block',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signin-block.html',
  styleUrl: './signin-block.scss'
})
export class SigninBlock {
  form = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
    username: new FormControl(null)
  })
  constructor(private router: Router) {}

  authService = inject(AuthService)
  loginPage = inject(LoginPage);

  public onSubmit( ) {
    if(this.form.valid) {
      //@ts-ignore
      this.authService.signup(this.form.value).subscribe(
        (value) => {
          // Успешный ответ
          this.authService.token = value.token;
          if (value.user!= null && value.token != null) {
            this.authService.user = new User(value.user.id, value.user.username, value.user.password, value.user.email, value.user.admin, value.user.created_at);
            this.router.navigate(['/find'])
          }
        },
        (error) => {
          const errorMessage = error.error?.message || 'Произошла ошибка';
          if(errorMessage == "Email занят"){
            this.form.reset();
            this.loginPage.errorMessage = "Email занят";
          }
          else{
            alert(errorMessage);

          }
        }
      )
    }
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign_in']);
  }



}
