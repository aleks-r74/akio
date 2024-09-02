import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { MoneyFlowResponseDto } from '../../../interfaces/money/MoneyFlowResponseDto.interface';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from "../../../elements/pagination/pagination.component";

@Component({
  selector: 'app-money-flow-table',
  standalone: true,
  imports: [DatePipe, JsonPipe, TitleCasePipe, TranslateModule, PaginationComponent],
  templateUrl: './money-flow-table.component.html',
  styleUrl: './money-flow-table.component.css'
})
export class MoneyFlowTableComponent {
  @Input() data?: MoneyFlowResponseDto;
  @Input() showDetails?: boolean;
  @Output() receiptSelected = new EventEmitter<string>();
  @Output() pageSelected = new EventEmitter<number>();
  screenSize = screen.width;
  
  onMfClick(date: string){
    if(!this.showDetails) return;
    this.receiptSelected.emit(date);
  }

  onPageSelected(page: number){
    this.pageSelected.emit(page);
  }
}
