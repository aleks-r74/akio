import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Direction } from '../../../interfaces/money/moneyContainerDto.interface';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MoneyFlowDto } from '../../../interfaces/money/moneyFlowDto.interface';

@Component({
  selector: 'app-money-direction',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './money-direction.component.html',
  styleUrl: './money-direction.component.css'
})
export class MoneyDirectionComponent implements OnChanges{
  @Input() directions?: {source: string, dest: string}[];
  @Input() summaryMfs?: MoneyFlowDto[];
  @Output() directionSelected = new EventEmitter<Direction>();
  selected?: Direction;
  fresh: Direction[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['directions'] && this.directions?.length == 1)
      setTimeout(()=>this.onDirectionSelected(this.directions![0]),0);
    if(!changes['summaryMfs'] || !this.summaryMfs) return;
    let currentDate = new Date();
    for(let t of this.summaryMfs!){
      let dateToCheck = new Date(t.time_stamp!);
      const isSameDay = dateToCheck.getDate() === currentDate.getDate() &&
                dateToCheck.getMonth() === currentDate.getMonth() &&
                dateToCheck.getFullYear() === currentDate.getFullYear();
      if(isSameDay) this.fresh.push({source: t.source, dest: t.dest});
    }
    
  }

  onDirectionSelected( direction: Direction){
    this.selected = direction;
    this.directionSelected.emit(direction);
  }

  isFreshDirection(direction: Direction): boolean{  
    return this.fresh.some(item=>item.source===direction.source && item.dest === direction.dest);
  }
}
