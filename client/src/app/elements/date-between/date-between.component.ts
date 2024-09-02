import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-date-between',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './date-between.component.html',
  styleUrl: './date-between.component.css'
})
export class DateBetweenComponent implements OnInit{
  fromDateTime: string;
  toDateTime: string;

  @Output() dates = new EventEmitter<DatesBetween>();
  constructor(){
    const from = new Date();
    const to = new Date();
    from.setUTCHours(0); from.setMinutes(0); from.setSeconds(0);
    to.setUTCHours(23); to.setMinutes(59); to.setSeconds(0);
    this.toDateTime = to.toISOString().substring(0,19);
    this.fromDateTime = from.toISOString().substring(0,19);
  }
  ngOnInit(): void {
    setTimeout(()=>this.emitDates());
  }
  onDateChange(event: Event){
    const datePicker = event.target as HTMLInputElement;
    if(datePicker.getAttribute('id')==="fromDateTime"){
        this.fromDateTime = datePicker.value
    } 
    else if(datePicker.getAttribute('id')==="toDateTime"){
      this.toDateTime = datePicker.value
    }
  }
  emitDates(){
    this.dates.emit({
      from: this.fromDateTime,
      to: this.toDateTime
    });
  }
}

export interface DatesBetween{
  from: string;
  to: string;
}