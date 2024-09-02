import { Component, OnInit, signal } from '@angular/core';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { EmployeeTotalComponent } from "./employee-total/employee-total.component";
import { DateBetweenComponent, DatesBetween } from "../elements/date-between/date-between.component";
import { PaginationComponent } from "../elements/pagination/pagination.component";
import { HttpClientService } from '../http/http-client.service';
import { EmployeeCalc, TransactionsResponseDto } from '../interfaces/transactions/TransactionsResponseDto.interface';
import { JsonPipe } from '@angular/common';
import { ErrorComponent } from "../elements/error/error.component";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionsTableComponent, EmployeeTotalComponent, DateBetweenComponent, PaginationComponent, JsonPipe, ErrorComponent, TranslateModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  fromDateTime: string;
  toDateTime: string;
  employees?: string[];
  emloyeeCalcs?: EmployeeCalc[];
  savedCalcs?: Map<string, number>;

  response?: TransactionsResponseDto;
  dates?: DatesBetween;
  errors = signal<undefined|HttpErrorResponse>(undefined);
  requestFlag = false;

  constructor(private httpService: HttpClientService, public authService: AuthenticationService){
    const from = new Date();
    const to = new Date();
    from.setUTCHours(0); from.setMinutes(0); from.setSeconds(0);
    to.setUTCHours(23); to.setMinutes(59); to.setSeconds(0);
    this.toDateTime = to.toISOString().substring(0,19);
    this.fromDateTime = from.toISOString().substring(0,19);
  }

  calculateEmployeeTransactions() {
    if(!this.employees) return;
    let calcs: EmployeeCalc[] = [];

    for(const employee of this.employees){
      let employeeSum = this.response?.transactionsOnThePage
                                    .filter(t=>t.employee===employee && !t.readonly) // read-only means it already calculated on server
                                    .map(val=>val.money_accepted)
                                    .reduce((prev,curr)=>{return prev+curr;},0);
      employeeSum = employeeSum ? employeeSum : 0;
      if(this.savedCalcs?.has(employee))
        employeeSum += this.savedCalcs?.get(employee)!;
      calcs.push({name: employee, sum: employeeSum});
    }

    this.emloyeeCalcs = calcs;
  }
  
  onEmployeeSet(event: Observable<void>|'update') {
    if(event==='update'){
      this.calculateEmployeeTransactions();
      return;
    }
    
    this.requestFlag = true;
    event.subscribe({
      error: err=>this.errors.set(err),
      complete: ()=>this.requestFlag=false
    })

  }

  onResetClick(){
    this.response?.transactionsOnThePage.forEach(t=>{
      if(!t.readonly) t.employee=''
    });
    this.calculateEmployeeTransactions();
  }

  onDatesSelected(dates: DatesBetween){
    // send get request to get transactions
    this.dates = dates;
    this.loadData(1);
  }

  onPageSelected(page: number){
      // send get request to get transactions
      this.loadData(page);
  }

  // page number starts from 1
  private loadData(page: number){
    this.requestFlag = true;
    this.httpService.getTransactions(this.dates!, page-1)
    .subscribe({
      next: data=>{
                     this.response = {
                                        ...data, 
                                        transactionsOnThePage: data.transactionsOnThePage
                                        .map(t=>{
                                            if(t.employee) t.readonly = true;
                                            return t;
                                          }
                                        )
                                      };
                  this.savedCalcs = new Map(Object.entries(data.employeesSum));
                  this.employees = Array.from(this.savedCalcs.keys());
                  },
      error: (err)=> this.errors.set(err),
      complete: ()=> {
        this.requestFlag = false;
        this.onResetClick();
      }
  }); 
  
  }

  saveTransactions(){
    // send request to save transactions
    this.requestFlag = true;
    if(this.response){
      this.httpService.updateTransactionsEmployees(this.response.transactionsOnThePage).subscribe({
        error: (err)=>{
          this.errors.set(err);
        },
        complete: ()=>{
          // loads data and sets the requestFlag to false
          this.loadData(this.response!.currentPage+1);
        }
      });
    }
    
  }



}


