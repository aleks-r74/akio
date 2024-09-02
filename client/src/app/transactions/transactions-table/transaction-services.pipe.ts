import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionServicesPipe',
  standalone: true
})
export class TransactionServicesPipe implements PipeTransform {
  max_length = screen.width < 500 ? 7 : 18;

  transform(value: string | undefined, ...args: unknown[]): string {
    if(value === undefined) return "";
    value = value.trim();
    let services: string[] = value.split("\n");

          //shorten the first service name
          if(services[0].length>=this.max_length)
            services[0] = services[0].substring(0,this.max_length) + "...";
    if(services.length>1){

      return `${services[0]} [+${services.length - 1}]`;
    }
    return services[0];
  }

}
