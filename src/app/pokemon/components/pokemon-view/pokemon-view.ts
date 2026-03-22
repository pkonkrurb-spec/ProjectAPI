import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pokemon } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';
import { getTypeColor } from '../../helpers';

@Component({
  selector: 'app-pokemon-view',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './pokemon-view.html',
  styleUrl: './pokemon-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonView {
  readonly data = input.required<Pokemon>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly officialArtwork = computed(
    () => this.data().sprites.other['official-artwork'].front_default,
  );

  protected readonly primaryTypeName = computed(
    () => this.data().types[0]?.type.name ?? 'normal',
  );

  protected readonly heroBackground = computed(() => {
    const color = getTypeColor(this.primaryTypeName());
    return `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`;
  });

  protected readonly statMax = 255;

  protected getStatPercent(value: number): number {
    return Math.round((value / this.statMax) * 100);
  }

  protected getStatColor(value: number): string {
    if (value >= 150) return '#22c55e';
    if (value >= 90) return '#84cc16';
    if (value >= 60) return '#eab308';
    if (value >= 40) return '#f97316';
    return '#ef4444';
  }

  protected getTypeColor(type: string): string {
    return getTypeColor(type);
  }

  protected formatStatName(name: string): string {
    const map: Record<string, string> = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SP.ATK',
      'special-defense': 'SP.DEF',
      speed: 'SPD',
    };
    return map[name] ?? name.toUpperCase();
  }

}
