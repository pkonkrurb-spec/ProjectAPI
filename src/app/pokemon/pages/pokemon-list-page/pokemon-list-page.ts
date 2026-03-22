import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormField, disabled, form, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { pokemonListResource, pokemonAllResource, purnEmptyProperties } from '../../helpers';
import { PokemonList } from '../../components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-pokemon-list-page',
  imports: [PokemonList, FormField, RouterLink, DecimalPipe],
  templateUrl: './pokemon-list-page.html',
  styleUrl: './pokemon-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListPage {
  readonly search = input<string>();
  readonly offset = input<string>();

  protected readonly params = computed(
    () =>
      ({
        search: this.search() ?? '',
        offset: this.offset() ?? '',
      }) as const,
  );

  protected readonly isSearching = computed(() => this.params().search.trim().length > 0);

  // Normal paginated resource — used when NOT searching
  protected readonly pagedResource = pokemonListResource(() =>
    purnEmptyProperties({ offset: this.params().offset }),
  ).asReadonly();

  // Full list resource — only fires when user is searching
  protected readonly allResource = pokemonAllResource(this.isSearching).asReadonly();

  // Active resource depends on search mode
  protected readonly resource = computed(() =>
    this.isSearching() ? this.allResource : this.pagedResource,
  );

  protected readonly filteredResults = computed(() => {
    const res = this.resource();
    if (!res.hasValue()) return [];
    const q = this.params().search.toLowerCase().trim();
    const results = res.value()!.results;
    return q ? results.filter((p) => p.name.toLowerCase().includes(q)) : results;
  });

  // Pagination — only meaningful when NOT searching
  protected readonly currentOffset = computed(() => +(this.params().offset || '0'));
  protected readonly currentPage = computed(() => Math.floor(this.currentOffset() / 20) + 1);

  protected readonly previousOffset = computed(() => {
    if (
      this.isSearching() ||
      !this.pagedResource.hasValue() ||
      !this.pagedResource.value().previous
    )
      return null;
    return new URL(this.pagedResource.value().previous!).searchParams.get('offset') ?? '0';
  });

  protected readonly nextOffset = computed(() => {
    if (this.isSearching() || !this.pagedResource.hasValue() || !this.pagedResource.value().next)
      return null;
    return new URL(this.pagedResource.value().next!).searchParams.get('offset') ?? null;
  });

  protected readonly isLoading = computed(() => this.resource().isLoading());
  protected readonly totalCount = computed(() =>
    this.pagedResource.hasValue() ? this.pagedResource.value().count : 0,
  );

  protected readonly searchForm = form(
    linkedSignal(() => ({ search: this.params().search }) as const),
    (path) => {
      disabled(path, () => this.isLoading());
    },
  );

  private readonly router = inject(Router);

  protected onSearch(): void {
    submit(
      this.searchForm,
      async (f) =>
        void this.router.navigate([], {
          queryParams: purnEmptyProperties({ search: f().value().search, offset: null }),
          replaceUrl: true,
        }),
    );
  }

  protected clearSearch(): void {
    this.searchForm.search().value.set('');
    this.onSearch();
  }
}
