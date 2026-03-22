import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', loadChildren: () => import('./pokemon/routes') },
];
