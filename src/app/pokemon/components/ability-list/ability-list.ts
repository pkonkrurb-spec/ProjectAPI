import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NamedAPIResource } from '../../types';
import { FormatNamePipe } from '../../pipes/format-name-pipe';

@Component({
  selector: 'app-ability-list',
  imports: [RouterLink, FormatNamePipe],
  templateUrl: './ability-list.html',
  styleUrl: './ability-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityList {
  readonly data = input.required<readonly NamedAPIResource[]>();
}
