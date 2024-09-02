import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSign',
  standalone: true
})
export class NumberSignPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value > 0 ? `+${value}` : `${value}`;
  }

}
