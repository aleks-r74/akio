import { Component, OnInit, signal } from '@angular/core';
import { DateMonthComponent } from "../elements/date-month/date-month.component";
import { HttpClientService } from '../http/http-client.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SummaryTableComponent } from "./summary-table/summary-table.component";
import { SummaryEmployeesComponent } from "./employees-summary/employees-summary.component";
import { SummaryResponseDto } from '../interfaces/summary/SummaryResponseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from "../elements/error/error.component";
import { AuthenticationService } from '../authentication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [DateMonthComponent, AsyncPipe, JsonPipe, NgIf, SummaryTableComponent, SummaryEmployeesComponent, ErrorComponent, TranslateModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
    constructor(private httpService: HttpClientService, public authService: AuthenticationService){}
    summary?: SummaryResponseDto;
    error = signal<undefined|HttpErrorResponse>(undefined);
    requestFlag = false;

  onDateSelected(dateMonth: string){
    if(dateMonth=="") return;
    setTimeout(()=>this.requestFlag=true);
    this.httpService.getSummary(dateMonth).subscribe({
      next: data=>  {if(data) this.summary = data;},
      error: (error)=> {this.error.set(error); this.requestFlag = false;},
      complete: () => { this.error.set(undefined); this.requestFlag = false;}
    });
  }
}
