import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-date-month',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './date-month.component.html',
  styleUrl: './date-month.component.css'
})
export class DateMonthComponent implements AfterViewInit{
@Input() label!: string;
@ViewChild('date') date!: ElementRef;
@Output() dateMonthSelected = new EventEmitter<string>();

ngAfterViewInit(): void {
  const dateEl =  this.date.nativeElement as HTMLInputElement;
  dateEl.value=new Date().toISOString().substring(0,7);
  this.dateMonthSelected.emit(dateEl.value);
}

onDateSelected(event: Event){
  const htmlEl = event.target as HTMLInputElement; 
  this.dateMonthSelected.emit(htmlEl.value);
}
}
