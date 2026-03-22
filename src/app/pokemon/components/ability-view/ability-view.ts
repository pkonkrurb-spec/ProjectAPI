import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Ability } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';

@Component({
  selector: 'app-ability-view',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './ability-view.html',
  styleUrl: './ability-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityView {
  readonly data = input.required<Ability>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly englishEffect = computed(() =>
    this.data().effect_entries.find((e) => e.language.name === 'en') ?? null,
  );

  protected readonly englishFlavorTexts = computed(() =>
    this.data()
      .flavor_text_entries.filter((f) => f.language.name === 'en')
      .slice(0, 3),
  );
}
