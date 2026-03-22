import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { typeListResource, purnEmptyProperties } from '../../helpers';
import { TypeList } from '../../components/type-list/type-list';

@Component({
  selector: 'app-type-list-page',
  imports: [TypeList, DecimalPipe],
  templateUrl: './type-list-page.html',
  styleUrl: './type-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeListPage {
  readonly offset = input<string>();

  protected readonly params = computed(() => ({ offset: this.offset() ?? '' }) as const);

  protected readonly resource = typeListResource(() =>
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
