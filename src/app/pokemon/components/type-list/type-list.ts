import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NamedAPIResource } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';
import { getTypeColor } from '../../helpers';

@Component({
  selector: 'app-type-list',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './type-list.html',
  styleUrl: './type-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeList {
  readonly data = input.required<readonly NamedAPIResource[]>();

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
