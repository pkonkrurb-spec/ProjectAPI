import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NamedAPIResource } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';

@Component({
  selector: 'app-pokemon-list',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {
  readonly data = input.required<readonly NamedAPIResource[]>();

  protected getPokemonId(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }

  protected getSpriteUrl(url: string): string {
    const id = this.getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
