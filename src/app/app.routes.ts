import { Routes } from '@angular/router';
import { Login } from './component/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [{
    path: 'login',
    component: Login
},{
    path: '',
    loadComponent: () => import('./layout/layout').then(m => m.Layout),
    canMatch: [authGuard]
}];
