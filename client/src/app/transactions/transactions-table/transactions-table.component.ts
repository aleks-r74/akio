import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TransactionDto } from '../../interfaces/transactions/transactionDto.interface';
import { TransactionServicesPipe } from './transaction-services.pipe';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PaginationComponent } from "../../elements/pagination/pagination.component";
import { TransactionsResponseDto } from '../../interfaces/transactions/TransactionsResponseDto.interface';
import { DatePipe } from '@angular/common';
import { PageSummaryComponent } from "../../elements/page-summary/page-summary.component";
import { AuthenticationService } from '../../authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientService } from '../../http/http-client.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [TransactionServicesPipe, TransactionDetailsComponent, PaginationComponent, DatePipe, TranslateModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent implements OnChanges{
  @Output() transactionUpd = new EventEmitter<'update'|Observable<void>>();
  @Output() pageSelected = new EventEmitter<number>();
  @Input() httpResponse?: TransactionsResponseDto;
  @Input() employeeList?: string[];
  
  screenSize = screen.width;

  totalPages?: number;
  currentPage?: number;

  transactionDetails: TransactionDto|undefined;
  showDetails: boolean = false;

  constructor(public authService: AuthenticationService, private httpService: HttpClientService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['httpResponse']){
      this.totalPages = this.httpResponse?.totalPages
      // in the response page numbers start with 0
      this.currentPage = this.httpResponse?.currentPage
      this.currentPage = this.currentPage ? this.currentPage + 1 : 1;
    }

  }
  onPageNumClick(page: number){
    this.pageSelected.emit(page);

  }
  onTransactionClick(transaction: TransactionDto){
    this.transactionDetails =  transaction;
    this.showDetails = true;
  }

  onEmployeeSelected(transaction: TransactionDto, employee: string){
    transaction.employee = employee;
    this.transactionUpd.emit("update");
  }

  onCloseTransactionDetails(event: boolean|number){
    this.showDetails = false;
    if(typeof event === 'boolean') return;
    
    const matchedItem = this.httpResponse?.transactionsOnThePage.find(item => item.receipt_num === event);
    if (matchedItem) 
      matchedItem.employee = "Deleting";
      let observable = this.httpService.cancelMoneyFlow(event as number)
        .pipe(
          finalize(()=>{
            this.pageSelected.emit(this.currentPage)
          })
        )
      this.transactionUpd.emit(observable);
  }



}

