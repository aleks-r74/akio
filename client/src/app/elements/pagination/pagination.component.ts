import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges{

@Input() currentPage! :number;
@Input() totalPages! :number;
@Output() pageSelected = new EventEmitter<number>();
pageRange: number = 1;
intervalId?: any;

ngOnChanges(changes: SimpleChanges): void {
  if(changes['totalPages']?.currentValue!=changes['totalPages']?.previousValue){
    this.pageRange = 1;
    this.currentPage = 1;
  }
}

onPageClick(page: number){
  if(page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.pageSelected.emit(page);
}

movePages(direction: number){
  if(direction+this.pageRange<1 || direction+this.pageRange>=this.totalPages-1) return;
  this.pageRange += direction;
  
  this.intervalId = setInterval(()=>{
    if(direction+this.pageRange<1 || direction+this.pageRange>=this.totalPages-1) return;
    this.pageRange += direction;
  },70);
}

stopTimer(){
  clearInterval(this.intervalId);
}
}
