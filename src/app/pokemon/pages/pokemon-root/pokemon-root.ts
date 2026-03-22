import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-pokemon-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './pokemon-root.html',
  styleUrl: './pokemon-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ModuleActivatedRoute,
      useFactory: () => inject(ActivatedRoute),
    },
  ],
})
export class PokemonRoot {}
