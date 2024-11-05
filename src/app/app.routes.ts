import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./domains/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'hero/:id',
    loadComponent: () => import('./domains/hero-detail/hero-detail.page').then((m) => m.HeroDetailPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
