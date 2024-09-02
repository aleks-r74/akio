import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EmployeeSummaryDto } from '../../interfaces/summary/EmployeeSummaryDto';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-employees',
  standalone: true,
  imports: [TranslateModule, DatePipe],
  templateUrl: './employees-summary.component.html',
  styleUrl: './employees-summary.component.css'
})
export class SummaryEmployeesComponent implements OnChanges, AfterViewInit{
  @Input() balances?: Map<string,number>;
  @Input() employeeSummary!: Map<string,EmployeeSummaryDto[]>;
  // employeeSummary converted to Map
  map: Map<string, EmployeeSummaryDto[]> = new Map();
  dates: string[] = [];
  // used for colspan in the table
  rowSpan: Map<string, number> = new Map();
  // summed up values for the month
  reducedSummary: Map<string, EmployeeSummaryDto> = new Map();
 
  @ViewChild("scrollableTable") scrollableTable?: ElementRef;
  
  ngAfterViewInit(): void {
    if (this.scrollableTable && this.scrollableTable.nativeElement) {
      const topOffset = this.scrollableTable.nativeElement.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const maxHeight = windowHeight - topOffset;
      this.scrollableTable.nativeElement.style.maxHeight = `${maxHeight}px`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['balances'].currentValue) this.balances = new Map<string,number>(Object.entries(changes['balances'].currentValue));
    
    if(!changes['employeeSummary']) return;
    
      this.map = new Map(Object.entries(this.employeeSummary));
      this.rowSpan.clear();
      this.reducedSummary.clear();
      this.dates = Object.keys(this.employeeSummary);
      for(let date of this.dates){
        if(!this.map.get(date)) continue;

        // create rowSpan map
        if(this.map.get(date)!.length>1)
            this.rowSpan.set(date, this.map.get(date)!.length);
          
        // calculate summary
        for(let employeeForDate of this.map.get(date)!){
          let oldSummary = this.reducedSummary.get(employeeForDate.name);
          if(!oldSummary) 
            oldSummary = {receipts: 0, freeHaircuts: 0, salary: 0, paid: 0, grossRev: 0, date: '', name: ''}
          this.reducedSummary.set(employeeForDate.name, {
              date: '',
              name: employeeForDate.name,
              receipts: oldSummary.receipts + employeeForDate.receipts,
              grossRev: oldSummary.grossRev + employeeForDate.grossRev,
              freeHaircuts: oldSummary.freeHaircuts + employeeForDate.freeHaircuts,
              salary: oldSummary.salary + employeeForDate.salary,
              paid: oldSummary.paid + employeeForDate.paid
          })
        }
      }

  }
}

