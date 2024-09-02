import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionDto } from '../../../interfaces/transactions/transactionDto.interface';
import { TransactionServicesPipe } from "../transaction-services.pipe";
import { ModalComponent } from "../../../elements/modal/modal.component";
import { MoneyFlowTableComponent } from "../../../money/money-management/money-flow-table/money-flow-table.component";
import { MoneyFlowResponseDto } from '../../../interfaces/money/MoneyFlowResponseDto.interface';
import { HttpClientService } from '../../../http/http-client.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../../../authentication.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [TransactionServicesPipe, ModalComponent, MoneyFlowTableComponent, TranslateModule],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent {
  @Input() transaction: TransactionDto|undefined;
  @Input() active: boolean = false;
  @Output('close') closeEvent = new EventEmitter<boolean|number>();
  requestFlag = false;

  relatedTransactions?: MoneyFlowResponseDto;

  constructor(private httpService: HttpClientService, public authService: AuthenticationService){}
  onShowMoneyTransactionsClick(receipt: number|undefined, date: string|undefined){
    if(!date || !receipt) return;
    this.requestFlag = true;
    this.httpService.getMoneyFlowsByReceiptNum(receipt,date).subscribe({ 
      next: data=> this.relatedTransactions = {moneyFlows: data} as MoneyFlowResponseDto,
      complete: ()=> this.requestFlag = false
    })
  }
  closeDetails(){
    this.closeEvent.emit(true);
    this.relatedTransactions = undefined;
  }

  allServices(): string[]|undefined{
    return this.transaction?.services.trim().split("\n");
  }

  unAssign(receipt_num: number){
    this.closeEvent.emit(receipt_num);
    this.relatedTransactions=undefined;
  }

  todaysTransaction(date: string):boolean{
    let beginningOfToday: Date = new Date();
    beginningOfToday.setHours(0, 0, 0);
    let transactionDate = new Date(date);
    return transactionDate > beginningOfToday;
  }
}
