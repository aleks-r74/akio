import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, first, Observable, throwError } from 'rxjs';
import { SummaryResponseDto } from '../interfaces/summary/SummaryResponseDto';
import { DatesBetween } from '../elements/date-between/date-between.component';
import { TransactionsResponseDto } from '../interfaces/transactions/TransactionsResponseDto.interface';
import { TransactionDto } from '../interfaces/transactions/transactionDto.interface';
import { MoneyContainerDto } from '../interfaces/money/moneyContainerDto.interface';
import { MoneyFlowDto } from '../interfaces/money/moneyFlowDto.interface';
import { MoneyFlowRequest } from '../interfaces/money/MoneyFlowRequestDto.interface';
import { MoneyFlowResponseDto } from '../interfaces/money/MoneyFlowResponseDto.interface';
import { ExpensesDto } from '../interfaces/expenses/ExpensesDto.interface';
import { DatePrice } from '../money/sixth-cuts/sixth-cuts.component';
import { ScheduleDto } from '../interfaces/schedule/scheduleDto.interface';
import { UserDto } from '../interfaces/users/usersDto.interface';
import { environment } from '../../environments/environment';
import { ContainersSummaryDto } from '../interfaces/money/containersSummaryDto.interface';
import { LogDto } from '../interfaces/money/logDtos.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService{
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient){}

  getSummary(monthAndYear: string): Observable<SummaryResponseDto>  {
    return this.httpClient.get<SummaryResponseDto>(this.baseUrl+"/summary",{
      params: {
          date: monthAndYear
      }
    }).pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          return throwError(()=>error); 
        })
      )
  }

  getTransactions(dates: DatesBetween, page: number): Observable<TransactionsResponseDto>{
    return this.httpClient.post<TransactionsResponseDto>(this.baseUrl + '/transactions',
      {
          from: dates.from,
          to: dates.to,
          page: page,
      }
    ).pipe(
      catchError(err=>{
        return throwError(()=>{
          //err.message = 'server is unavailable';
          return err;
        });
      }),
      first()
    )
  }

  getLastTransactionTime(): Observable<Date>{
    return this.httpClient.get<Date>(this.baseUrl + '/transactions/last')
      .pipe(first());
  }

  updateTransactionsEmployees(transactions: TransactionDto[]){
    return this.httpClient
    .patch(this.baseUrl + '/transactions',transactions)
    .pipe(
      catchError(err=>{
        return throwError(()=>{
          //err.message = 'server is unavailable';
          return err;
        });
      }),
      first()
    )
  }

  getUsers(authorities: string[]){
    return this.httpClient
    .get<string[]>(this.baseUrl + '/users', {
      params: {
        authorities: authorities
      }
    })
    .pipe(
      catchError(err=>{
        return throwError(()=>{
          //err.message = 'server is unavailable';
          return err;
        });
      }),
      first()
    )
  }
  
  getAllUsersWithAuthorities(): Observable<UserDto[]> {
    return this.httpClient
    .get<UserDto[]>(this.baseUrl + '/users/all')
    .pipe(
      catchError(err=>{
        return throwError(()=>{
          //err.message = 'server is unavailable';
          return err;
        });
      }),
      first()
    )
  }

  addNewUser(user: UserDto): Observable<UserDto[]>{
    return this.httpClient.post<UserDto[]>(this.baseUrl + '/users', user)
    .pipe(
      first()
    )
  }

  deleteUser(username: string): Observable<UserDto[]>{
    return this.httpClient.delete<UserDto[]>(`${this.baseUrl}/users/${username}`)
    .pipe(
      first()
    )
  }

  updateUserPassword(user: UserDto): Observable<void>{
    return this.httpClient.put<void>(this.baseUrl + '/users', user)
    .pipe(
      first()
    )
  }

  getAllAuthorities(): Observable<string[]> {
    return this.httpClient
    .get<string[]>(this.baseUrl + '/users/authorities')
    .pipe(
      catchError(err=>{
        return throwError(()=>{
          //err.message = 'server is unavailable';
          return err;
        });
      }),
      first()
    )
  }

  getContainers(): Observable<ContainersSummaryDto>{
    return this.httpClient.get<ContainersSummaryDto>(this.baseUrl+"/money")
      .pipe(
        first()
      )
  }

  transferMoney(moneyFlow: MoneyFlowDto): Observable<MoneyContainerDto[]>{
    return this.httpClient.post<MoneyContainerDto[]>(this.baseUrl + '/money', moneyFlow)
      .pipe(
        first()
      )
  }

  getMoneyFlows(moneyFlowsRequest: MoneyFlowRequest): Observable<MoneyFlowResponseDto>{
    return this.httpClient.post<MoneyFlowResponseDto>(this.baseUrl + '/money/flow', moneyFlowsRequest)
      .pipe(
        first()
      )
  }

  getMoneyFlowsByReceiptNum(receipt: number, date: string): Observable<MoneyFlowDto[]>{
    return this.httpClient.get<MoneyFlowDto[]>(this.baseUrl + '/money/flow', {
      params: {
        receiptNum: receipt,
        timeStamp: date
      }
    })
      .pipe(
        first()
      )
  }

  getExpenses():Observable<ExpensesDto[]>{
    return this.httpClient.get<ExpensesDto[]>(this.baseUrl+"/expenses").pipe(
        first()
      )
  }

  deleteExpense(expense_id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/expenses/${expense_id}`).pipe(
      first()
    )
  }

  updateExpenses(expenses: ExpensesDto[]): Observable<ExpensesDto[]>{
    return this.httpClient.post<ExpensesDto[]>(this.baseUrl + '/expenses', expenses)
    .pipe(
      first()
    )
  }

  getSixHaircutDatePrices(): Observable<DatePrice[]>{
    return this.httpClient.get<DatePrice[]>(this.baseUrl+"/expenses/sixhaircuts").pipe(
      first()
    )
  }

  deleteSixHaircutDatePrice(date: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/expenses/sixhaircuts/${date}`).pipe(
      first()
    )
  }

  updateSixHaircutDatePrices(datePrices: DatePrice[]): Observable<DatePrice[]>{
    return this.httpClient.post<DatePrice[]>(this.baseUrl + '/expenses/sixhaircuts', datePrices)
    .pipe(
      first()
    )
  }

  getSchedule(date: string): Observable<ScheduleDto[]>{
    return this.httpClient.get<ScheduleDto[]>(this.baseUrl+"/employee/schedule",{
      params:{
        date: date
      }
    }).pipe(
      first()
    )
  }

  updateSchedule(schedule: ScheduleDto[]): Observable<ScheduleDto[]>{
    return this.httpClient.put<ScheduleDto[]>(this.baseUrl + '/employee/schedule', schedule)
    .pipe(
      first()
    )
  }

  deleteSchedule(schedule: ScheduleDto[]): Observable<void>{
    return this.httpClient.request<void>('DELETE',this.baseUrl + '/employee/schedule', {body: schedule})
    .pipe(
      first()
    )
  }

  login(userDto: UserDto):Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(this.baseUrl + "/auth", userDto, {
      observe: 'response' // This option returns the full response
    })
      .pipe(first())
  }

  getLogs(date: string): Observable<Map<Date,LogDto>>{
    return this.httpClient.get<Map<Date,LogDto>>(this.baseUrl+"/money/logs",{
      params:{
        date: date
      }
    }).pipe(
      first()
    )
  }

  cancelMoneyFlow(receipt_num: number): Observable<void>{
    return this.httpClient.delete<void>(this.baseUrl+"/money/flow/" + receipt_num)
    .pipe(
      first()
    )
  }
}
