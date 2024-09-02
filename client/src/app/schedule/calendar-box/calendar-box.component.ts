import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ScheduleDisplay } from '../schedule.component';
import { NgClass } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar-box',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './calendar-box.component.html',
  styleUrl: './calendar-box.component.css'
})
export class CalendarBoxComponent implements OnChanges{

@Input() scheduleDisplay!: ScheduleDisplay;
@Output('scheduleUpdate') updatedSchedule = new EventEmitter<ScheduleDisplay>();
readOnly!: boolean;
day!: string;
month!: string;
imageStyle = `background-image: url("${environment.assetPath}/assets/images/calendar-background.jpg");`;

  constructor(public authService: AuthenticationService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.day = this.scheduleDisplay.date.slice(-2);
    const [year, month, day] = this.scheduleDisplay.date.split('-').map(Number);
    let cardDate = new Date(year, month-1, day);
    let now = new Date();
    let nowDate = new Date(now.getFullYear(),now.getUTCMonth(),now.getUTCDate());
    this.month = cardDate.toLocaleString('default', { month: 'long' });
    this.readOnly = cardDate < nowDate;
  }

  onEmployeeClick(employee: {name: string, scheduled: boolean}){
    if(this.readOnly) return;
    
    employee = {...employee, scheduled: !employee.scheduled}
    this.scheduleDisplay
      .employees
      .filter(el=>el.name===employee.name)
      .map(el=>el.scheduled=!el.scheduled)
    this.updatedSchedule.emit(this.scheduleDisplay);
  }
}