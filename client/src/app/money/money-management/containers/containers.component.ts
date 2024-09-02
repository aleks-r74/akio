import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MoneyContainerDto } from '../../../interfaces/money/moneyContainerDto.interface';
import { NgClass } from '@angular/common';
import { MoneyFlowDto } from '../../../interfaces/money/moneyFlowDto.interface';
import { last } from 'rxjs';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [NgClass],
  templateUrl: './containers.component.html',
  styleUrl: './containers.component.css'
})
export class ContainersComponent implements OnChanges{
@Input() containers?: MoneyContainerDto[];
@Input() summaryMfs?: MoneyFlowDto[];
@Output('containerClick') clickEvent = new EventEmitter<MoneyContainerDto>();
templateBgColor = "has-background-success-95";
selectedBgColor = "has-background-success-75"
selected?: MoneyContainerDto;
outFlow: string[] = [];
inFlow: string[] = [];

ngOnChanges(changes: SimpleChanges): void {
  if(!this.summaryMfs) return;
  let currentDate = new Date();
  this.inFlow = [];
  this.outFlow = [];
  for(let t of this.summaryMfs!){
    let dateToCheck = new Date(t.time_stamp!);
    const isSameDay = dateToCheck.getDate() === currentDate.getDate() &&
              dateToCheck.getMonth() === currentDate.getMonth() &&
              dateToCheck.getFullYear() === currentDate.getFullYear();
      if(isSameDay) this.inFlow?.push(t.dest);
      if(isSameDay) this.outFlow?.push(t.source);
  }
}
 checkInFlow(container: string): boolean{
    for(let inContainer of this.inFlow)
      if(inContainer === container) return true;
    return false;
 }
 checkOutFlow(container: string): boolean{
  for(let outContainer of this.outFlow)
    if(outContainer === container) return true;
  return false;
}
onContainerClick(container: MoneyContainerDto){
  this.selected = container;
  this.clickEvent.emit(container);
}

}
