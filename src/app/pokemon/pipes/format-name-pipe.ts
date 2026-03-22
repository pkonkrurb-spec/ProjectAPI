import { Pipe, PipeTransform } from '@angular/core';
import { formatPokemonName } from '../helpers';

@Pipe({
  name: 'formatName',
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string): string {
    return formatPokemonName(value);
  }
}
