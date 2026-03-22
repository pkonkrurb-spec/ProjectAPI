import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { abilityListResource, purnEmptyProperties } from '../../helpers';
import { AbilityList } from '../../components/ability-list/ability-list';

@Component({
  selector: 'app-ability-list-page',
  imports: [AbilityList, RouterLink, DecimalPipe],
  templateUrl: './ability-list-page.html',
  styleUrl: './ability-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityListPage {
  readonly offset = input<string>();

  protected readonly params = computed(() => ({ offset: this.offset() ?? '' }) as const);

  protected readonly resource = abilityListResource(() =>
    purnEmptyProperties(this.params()),
  ).asReadonly();

  protected readonly currentOffset = computed(() => +(this.params().offset || '0'));
  protected readonly currentPage = computed(() => Math.floor(this.currentOffset() / 20) + 1);

  protected readonly previousOffset = computed(() => {
    if (!this.resource.hasValue() || !this.resource.value().previous) return null;
    return new URL(this.resource.value().previous!).searchParams.get('offset') ?? '0';
  });

  protected readonly nextOffset = computed(() => {
    if (!this.resource.hasValue() || !this.resource.value().next) return null;
    return new URL(this.resource.value().next!).searchParams.get('offset') ?? null;
  });

}
