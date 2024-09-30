import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SummaryDto } from '../../interfaces/summary/summaryDto.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from "../../elements/modal/modal.component";

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [TranslateModule, ModalComponent],
  templateUrl: './summary-table.component.html',
  styleUrl: './summary-table.component.css'
})
export class SummaryTableComponent implements OnChanges{
@Input() summary?: SummaryDto;
expenses?: Map<string, number>;
showSpendings=false;

ngOnChanges(changes: SimpleChanges): void {
  if(changes['summary'] && this.summary?.expenses){
    this.expenses = new Map(Object.entries(this.summary.expenses!));
    let totalExpenses = 0;
    for(let exp of this.expenses?.values()){
      totalExpenses += exp;
    }
    this.expenses.set('Total', Math.floor(totalExpenses));
  }
}

}
