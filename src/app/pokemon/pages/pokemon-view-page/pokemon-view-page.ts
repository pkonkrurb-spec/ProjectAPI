import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PokemonView } from '../../components/pokemon-view/pokemon-view';
import { pokemonResource } from '../../helpers';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-pokemon-view-page',
  imports: [PokemonView],
  templateUrl: './pokemon-view-page.html',
  styleUrl: './pokemon-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonViewPage {
  readonly name = input.required<string>();

  protected readonly moduleRoute = inject(ModuleActivatedRoute);
  protected readonly resource = pokemonResource(this.name).asReadonly();

  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
