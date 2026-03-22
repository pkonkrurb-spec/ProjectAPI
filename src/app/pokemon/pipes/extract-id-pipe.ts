import { Pipe, PipeTransform } from '@angular/core';
import { extractId } from '../helpers';

@Pipe({
  name: 'extractId',
})
export class ExtractIdPipe implements PipeTransform {
  transform(value: string): string | null {
    return extractId(value);
  }
}
