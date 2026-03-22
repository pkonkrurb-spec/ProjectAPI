import { Routes } from '@angular/router';
import { PokemonRoot } from './pages/pokemon-root/pokemon-root';
import { PokemonListPage } from './pages/pokemon-list-page/pokemon-list-page';
import { PokemonViewPage } from './pages/pokemon-view-page/pokemon-view-page';
import { TypeListPage } from './pages/type-list-page/type-list-page';
import { TypeViewPage } from './pages/type-view-page/type-view-page';
import { AbilityListPage } from './pages/ability-list-page/ability-list-page';
import { AbilityViewPage } from './pages/ability-view-page/ability-view-page';

export default [
  {
    path: '',
    component: PokemonRoot,
    children: [
      { path: '', redirectTo: 'pokemon', pathMatch: 'full' },

      {
        path: 'pokemon',
        children: [
          { path: '', component: PokemonListPage },
          { path: ':name', component: PokemonViewPage },
        ],
      },

      {
        path: 'types',
        children: [
          { path: '', component: TypeListPage },
          { path: ':name', component: TypeViewPage },
        ],
      },

      {
        path: 'abilities',
        children: [
          { path: '', component: AbilityListPage },
          { path: ':name', component: AbilityViewPage },
        ],
      },
    ],
  },
] as Routes;
