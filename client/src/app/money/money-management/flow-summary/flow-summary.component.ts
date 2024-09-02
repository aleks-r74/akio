import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoneyFlowDto } from '../../../interfaces/money/moneyFlowDto.interface';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-flow-summary',
  standalone: true,
  imports: [TranslateModule,TitleCasePipe, DatePipe],
  templateUrl: './flow-summary.component.html',
  styleUrl: './flow-summary.component.css'
})
export class FlowSummaryComponent {
@Input() summary?: MoneyFlowDto[];
@Input() showCancel = false;
@Output() cancelMF = new EventEmitter();

  onCancel(receipt_num: number){
    this.cancelMF.emit(receipt_num);
  }
}
