import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonTypeDetail } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';
import { getTypeColor } from '../../helpers';

@Component({
  selector: 'app-type-view',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './type-view.html',
  styleUrl: './type-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeView {
  readonly data = input.required<PokemonTypeDetail>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  protected getTypeColor(type: string): string {
    return getTypeColor(type);
  }

  protected getTypeEmoji(type: string): string {
    const emojis: Record<string, string> = {
      normal: '⭐', fire: '🔥', water: '💧', electric: '⚡',
      grass: '🌿', ice: '❄️', fighting: '🥊', poison: '☠️',
      ground: '🌍', flying: '🕊️', psychic: '🔮', bug: '🐛',
      rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑',
      steel: '⚙️', fairy: '🧚', shadow: '🌀', unknown: '❓',
    };
    return emojis[type] ?? '❓';
  }
}
