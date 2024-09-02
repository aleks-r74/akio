import { Component, OnInit } from '@angular/core';
import { DateMonthComponent } from "../elements/date-month/date-month.component";
import { CalendarBoxComponent } from "./calendar-box/calendar-box.component";
import { ScheduleDto } from '../interfaces/schedule/scheduleDto.interface';
import { HttpClientService } from '../http/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from "../elements/error/error.component";
import { AuthenticationService } from '../authentication.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [DateMonthComponent, CalendarBoxComponent, ErrorComponent, TranslateModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})

export class ScheduleComponent implements OnInit{

  errorResponse?: HttpErrorResponse;
  requestFlag = false;
  successFlag = false;

  employees: string[] = [];
  scheduleDtos: ScheduleDto[] =[];
  originalScheduleDtos: ScheduleDto[] = []; // this is the original copy of scheduleDto used for deleting opertaions
  displaySchedule: ScheduleDisplay[] = [];
  
  constructor(private httpService: HttpClientService, public authService: AuthenticationService){}

  ngOnInit(): void {
    this.requestFlag = true;
    this.httpService.getUsers(["ROLE_EMPLOYEE"]).subscribe({
      next: data=> {this.employees = data;},
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.errorResponse = undefined;
        this.requestFlag = false;
        this.loadSchedule(new Date().toISOString().substring(0,10));
      }
    });
   
  }
  
  private loadSchedule(date: string){
    this.requestFlag = true;
    this.httpService.getSchedule(date).subscribe({
      next: data=> {
        this.scheduleDtos = []; 
        this.originalScheduleDtos = [];
        this.scheduleDtos = data; 
        this.originalScheduleDtos = [...data];
      },
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        let employeesFromSchedule = this.scheduleDtos.map(dto=>dto.employees)
              .reduce((prev,curr)=>{ // create big array of this.scheduledDtos.employees values
                curr.forEach(el=>prev.push(el));
                return prev; 
              })
              .filter((item, index, self)=> self.indexOf(item)===index); // keep only unique items in the list
        if(new Date(date).getUTCMonth() < new Date().getUTCMonth())
          this.displaySchedule = this.scheduleDtoToScheduleDisplay(this.scheduleDtos, employeesFromSchedule).reverse();
        else
          this.displaySchedule = this.scheduleDtoToScheduleDisplay(this.scheduleDtos, this.employees).reverse();
      }
    });
  }

  // modify scheduleDtos to be in sync with scheduleDisplay
  onScheduleUpdate(scheduleDisplay: ScheduleDisplay){
    for(let i=0; i<this.scheduleDtos.length; i++){
      if(this.scheduleDtos[i].date === scheduleDisplay.date){
        this.scheduleDtos[i] = this.scheduleDisplayToScheduleDto(scheduleDisplay);
      }
    }
  }

  scheduleDtoToScheduleDisplay(scheduleDtos: ScheduleDto[], employees: string[]): ScheduleDisplay[]{
    let displaySchedule: ScheduleDisplay[] = [];
    for(const day of scheduleDtos){
      let scheduleDisplayElement: ScheduleDisplay = {date: day.date, employees: []};
      for(let employee of employees){
        if(day.employees.includes(employee)){ 
          scheduleDisplayElement.employees.push({name: employee, scheduled: true})
        } else {
          scheduleDisplayElement.employees.push({name: employee, scheduled: false})
        }
      }
      displaySchedule.push(scheduleDisplayElement);
    }
    return displaySchedule;
  }

  scheduleDisplayToScheduleDto(scheduleDisplay: ScheduleDisplay): ScheduleDto{
    let scheduleDto: ScheduleDto;
      let scheduledEmployees: string[] = scheduleDisplay.employees.filter(el=>el.scheduled).map(el=>el.name);
      scheduleDto = {date: scheduleDisplay.date, employees: scheduledEmployees}
    return scheduleDto;
  }

  onMonthSelected(dateMonth: string){
    this.successFlag = false;
    let date = dateMonth + "-01";
    this.loadSchedule(date);
  }

  onSaveClick(){
    // check originalSchedule with scheduleDto
    this.successFlag = false;
    let scheduleDtoToDelete: ScheduleDto[] = [];
    for(let i=0; i<this.originalScheduleDtos.length; i++){
      if(this.originalScheduleDtos[i].employees.length > this.scheduleDtos[i].employees.length){
        scheduleDtoToDelete.push(this.originalScheduleDtos[i]);
      }
    }
    this.requestFlag = true;
    // if we have something to delete, do it first
    if(scheduleDtoToDelete.length>0){
      this.httpService.deleteSchedule(scheduleDtoToDelete).subscribe({
        error: err => {this.errorResponse = err;},
        complete: ()=>{
          this.updateSchedule();
        }
      })
    } else {
      this.updateSchedule();
    }

    
  }

  private updateSchedule(){
    this.httpService.updateSchedule(this.scheduleDtos).subscribe({
      next: data=> {
        this.scheduleDtos = []; 
        this.originalScheduleDtos = [];
        this.scheduleDtos = data; 
        this.originalScheduleDtos = [...data];
      },
      error: err => {this.errorResponse = err;},
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.displaySchedule = this.scheduleDtoToScheduleDisplay(this.scheduleDtos, this.employees).reverse();
        this.successFlag = true;
      }
    })
  }

}

export interface ScheduleDisplay{
  date: string,
  employees: {name: string, scheduled: boolean}[]
}