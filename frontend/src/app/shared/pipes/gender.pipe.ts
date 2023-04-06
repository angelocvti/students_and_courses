import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value == 'MALE') {
      return 'man';
    }
    return 'woman';
  }
}
