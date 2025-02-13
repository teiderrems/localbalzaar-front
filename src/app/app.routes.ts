import { Routes } from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'/products',
    pathMatch:'full',
  },
  {
    path:'dashboard',
    pathMatch:'prefix',
    loadComponent:()=>import('./admin/dashboard/dashboard.component').then(d=>d.DashboardComponent),
    loadChildren:()=>import('./admin/dashboard/dashboard.routes')
  },
  {
    path:'admin',
    redirectTo:'/dashboard',
    pathMatch:'full'
  },
  {
    path:'login',
    loadComponent:()=>import('./auth/login/login.component').then(l=>l.LoginComponent),
    pathMatch:'full',
    title:'Login',
  },
  {
    path:'register',
    loadComponent:()=>import('./auth/register/register.component').then(r=>r.RegisterComponent),
    pathMatch:'full',
    title:'Register'
  },
  {
    path:'products',
    loadComponent:()=>import('./product/product.component').then(p=>p.ProductComponent),
    pathMatch:'full',
    title:'Products'
  },
  {
    path:'shops',
    loadComponent:()=>import('./shop/shop.component').then(s=>s.ShopComponent),
    pathMatch:'full',
    title:'Shop'
  }
  ,
  {
    path:'**',
    component:NotFoundComponent,
    pathMatch:'full',
    title:'NotFound Page'
  }
];
