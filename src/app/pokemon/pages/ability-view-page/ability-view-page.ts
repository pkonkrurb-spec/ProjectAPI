import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AbilityView } from '../../components/ability-view/ability-view';
import { abilityResource } from '../../helpers';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-ability-view-page',
  imports: [AbilityView],
  templateUrl: './ability-view-page.html',
  styleUrl: './ability-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityViewPage {
  readonly name = input.required<string>();

  protected readonly moduleRoute = inject(ModuleActivatedRoute);
  protected readonly resource = abilityResource(this.name).asReadonly();

  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
