import { Component, OnInit } from '@angular/core';
import { Direction, MoneyContainerDto } from '../../interfaces/money/moneyContainerDto.interface';
import { DatesBetween, DateBetweenComponent } from '../../elements/date-between/date-between.component';
import { MoneyFlowDto } from '../../interfaces/money/moneyFlowDto.interface';
import { TransferFormComponent } from "./transfer-form/transfer-form.component";
import { ContainersComponent } from "./containers/containers.component";
import { PaginationComponent } from "../../elements/pagination/pagination.component";
import { MoneyFlowTableComponent } from "./money-flow-table/money-flow-table.component";
import { HttpClientService } from '../../http/http-client.service';
import { ErrorComponent } from "../../elements/error/error.component";
import { HttpErrorResponse } from '@angular/common/http';
import { MoneyFlowRequest } from '../../interfaces/money/MoneyFlowRequestDto.interface';
import { MoneyFlowResponseDto } from '../../interfaces/money/MoneyFlowResponseDto.interface';
import { JsonPipe } from '@angular/common';
import { MoneyDirectionComponent } from "./money-direction/money-direction.component";
import { TransactionDto } from '../../interfaces/transactions/transactionDto.interface';
import { TransactionDetailsComponent } from "../../transactions/transactions-table/transaction-details/transaction-details.component";
import { PageSummaryComponent } from "../../elements/page-summary/page-summary.component";
import { TranslateModule } from '@ngx-translate/core';
import { FlowSummaryComponent } from "./flow-summary/flow-summary.component";
import { ModalComponent } from "../../elements/modal/modal.component";
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-money-management',
  standalone: true,
  imports: [
    TransferFormComponent,
    ContainersComponent,
    DateBetweenComponent,
    PaginationComponent,
    MoneyFlowTableComponent,
    ErrorComponent,
    JsonPipe,
    MoneyDirectionComponent,
    TransactionDetailsComponent,
    PageSummaryComponent,
    TranslateModule,
    FlowSummaryComponent,
    ModalComponent
],
  templateUrl: './money-management.component.html',
  styleUrl: './money-management.component.css'
})
export class MoneyManagementComponent implements OnInit {

  containers?: MoneyContainerDto[];
  //containerNames?: string[];
  sources: string[] = [];
  dests: string[] = [];
  summaryMfs?: MoneyFlowDto[];
  freshMfs?: MoneyFlowDto[];
  selectedConatiner?: MoneyContainerDto;
  moneyFlowResponseDto?: MoneyFlowResponseDto;

  dates?: DatesBetween;
  totalPages?: number; 
  currentPage = 1;

  //details about selected receipt
  transactionDetails?: TransactionDto;
  showDetails=false;

  showLastTransactions=false;
  showSummarizedTransactions=false;

  moneyFlowRequest: MoneyFlowRequest = {
    from: undefined,
    to:   undefined,
    source: undefined,
    dest: undefined,
    page: this.currentPage - 1
  }

  errorResponse?: HttpErrorResponse;
  requestFlag = false;
  moneyTransferredFlag = false; 
  transactionCancelledFlag = false;
  constructor(private httpService: HttpClientService, public authService: AuthenticationService){}

  ngOnInit(): void {
    this.requestFlag = true;
    this.httpService.getContainers().subscribe({
      next: (data)=> {
        this.containers = data.containers; 
        this.sources = data.allowedSources;
        this.dests = data.allowedDests;
        this.summaryMfs = data.summarizedTransactions.reverse();
        this.freshMfs = data.lastTransactions.reverse();
      },
      error: (err)=>{this.errorResponse=err;},
      complete: ()=> {this.requestFlag = false; this.errorResponse=undefined;}
    })

  }

  onMoneyTransfer(moneyFlowDto: MoneyFlowDto){
    this.resetFlags();
    this.requestFlag = true;
    this.httpService.transferMoney(moneyFlowDto).subscribe({
      next: (data)=> {this.containers = data;},
      error: (err)=>{this.errorResponse=err;},
      complete: ()=> {
        this.requestFlag = false; 
        this.errorResponse=undefined; 
        this.moneyTransferredFlag = true;
        this.ngOnInit();
      }
    })
  }

  onDatesSelected(dates: DatesBetween){
    this.moneyFlowRequest = {
      ...this.moneyFlowRequest, 
      from: dates.from,
      to: dates.to,
      page: 0
    }
    this.loadMoneyFlows();
  }

  onContainerClick(container: MoneyContainerDto){
    this.selectedConatiner = container;
  }

  onPageSelected(page: number){
    this.moneyFlowRequest = {...this.moneyFlowRequest, page: page-1}
    this.currentPage = page;
    this.loadMoneyFlows();
  }

  onDirectionSelected(direction: Direction){
    this.currentPage = 1;
    this.moneyFlowRequest = {
      ...this.moneyFlowRequest, 
      source: direction.source, 
      dest: direction.dest,
      page: this.currentPage - 1
    }
    this.loadMoneyFlows();
  }

  private loadMoneyFlows(){
    if(Object.values(this.moneyFlowRequest).some(value=>value==undefined)) return;
    this.resetFlags()
    this.requestFlag = true;
    this.httpService.getMoneyFlows(this.moneyFlowRequest).subscribe({
      next: data => {
        this.moneyFlowResponseDto = data;
        this.totalPages = data.totalPages
      },
      error: (err)=>{this.errorResponse=err;},
      complete: ()=> {
        this.requestFlag = false; 
        this.errorResponse=undefined; 
      }
    })
  }

  loadTransactionByTimestamp(timestamp: string){
    this.resetFlags();
    this.requestFlag = true;
    this.httpService.getTransactions({from:timestamp, to:timestamp}, 0).subscribe({
      next: data=> {
        this.transactionDetails = data.transactionsOnThePage[0];
        this.showDetails = true;
      },
      error: (err)=>{this.errorResponse=err;},
      complete: ()=> {
        this.requestFlag = false; 
        this.errorResponse=undefined; 
      }
    })
  }

  onCancelMF(receipt_num: number){
    this.showLastTransactions = false;
    this.resetFlags();
    this.requestFlag=true;
    this.httpService.cancelMoneyFlow(receipt_num).subscribe({
      error: err=>this.errorResponse = err,
      complete: ()=>{
        this.ngOnInit();
        this.transactionCancelledFlag = true;
      }
    });

  }

  resetFlags(){
    this.requestFlag = false;
    this.moneyTransferredFlag = false; 
    this.transactionCancelledFlag = false;
  }
}
