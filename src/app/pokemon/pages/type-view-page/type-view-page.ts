import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TypeView } from '../../components/type-view/type-view';
import { typeResource } from '../../helpers';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-type-view-page',
  imports: [TypeView],
  templateUrl: './type-view-page.html',
  styleUrl: './type-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeViewPage {
  readonly name = input.required<string>();

  protected readonly moduleRoute = inject(ModuleActivatedRoute);
  protected readonly resource = typeResource(this.name).asReadonly();

  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
