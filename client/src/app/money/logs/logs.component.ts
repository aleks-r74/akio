import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateMonthComponent } from "../../elements/date-month/date-month.component";
import { HttpClientService } from '../../http/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from "../../elements/error/error.component";
import { TranslateModule } from '@ngx-translate/core';
import { LogDto } from '../../interfaces/money/logDtos.interface';
import { DatePipe, DecimalPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { NumberSignPipe } from './number-sign.pipe';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [DateMonthComponent, ErrorComponent,TranslateModule, TitleCasePipe, DatePipe, DecimalPipe, NumberSignPipe, NgClass, NgIf],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  @ViewChild("scrollableTable") scrollableTable?: ElementRef;
  requestFlag = false;
  errorResponse?: HttpErrorResponse;
  data?: Map<string,LogDto[]>;
  // the same as data, but instead of keys indexes
  dataCopyArr: LogDto[][] = [];
  containers: string[] = [];
  constructor(private httpService: HttpClientService){}

  onDateSelected(date: string){
    if(!date) return;
    setTimeout(()=>this.requestFlag = true);
    this.httpService.getLogs(date+'-01').subscribe({
      next: data => {
       this.data = new Map<string,LogDto[]>(Object.entries(data));
       if(this.containers.length==0) this.setContainerNames();
       this.dataCopyArr = Array.from(this.data.values());
      },
      error: err => {this.errorResponse = err; this.requestFlag = false;},
      complete: ()=>{
        this.requestFlag=false; 
        this.errorResponse=undefined;
      }
    });
  }

  setContainerNames(){
   if(!this.data) return;
    for(let date of this.data?.keys()!){
      this.containers = this.data?.get(date)?.map(item=>item.containerName.toLowerCase())!; 
      this.containers.sort(); 
      return;   
    }    
  }

  getDeltaBalance(dateIndex: number, containerIndex: number):number{
    if(!this.dataCopyArr) return 0;
    if(dateIndex+1==this.dataCopyArr.length) return 0;
     return Math.floor(this.dataCopyArr[dateIndex][containerIndex].balance) - Math.floor(this.dataCopyArr[dateIndex+1][containerIndex].balance);
  }
  
  ngAfterViewInit(): void {
    if (this.scrollableTable && this.scrollableTable.nativeElement) {
      const topOffset = this.scrollableTable.nativeElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const maxHeight = windowHeight - topOffset;
      this.scrollableTable.nativeElement.style.maxHeight = `${maxHeight}px`;
    }
  }

}
