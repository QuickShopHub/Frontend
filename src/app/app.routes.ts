import { Routes } from '@angular/router';
import {SearchPage} from './pages/search-page/search-page';
import {LoginPage} from './pages/login-page/login-page';

export const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'find', component: SearchPage}
];
