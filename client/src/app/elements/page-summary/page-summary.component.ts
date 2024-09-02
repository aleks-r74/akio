import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-summary',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './page-summary.component.html',
  styleUrl: './page-summary.component.css'
})
export class PageSummaryComponent implements OnChanges{
@Input() transactionNum?: number;
@Input() transactionSum?: number
@Input() pageSum?: number;
showPageSum: boolean = false;

ngOnChanges(changes: SimpleChanges): void {
  this.showPageSum = !!this.transactionSum && !!this.pageSum && (this.transactionSum > this.pageSum);
}

}
