import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active',
})
export class ActivePipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    if (value) {
      return 'done';
    }
    return 'close';
  }
}
