import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorComponent } from "../../elements/error/error.component";
import { HttpClientService } from '../../http/http-client.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sixth-cuts',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorComponent, TranslateModule],
  templateUrl: './sixth-cuts.component.html',
  styleUrl: './sixth-cuts.component.css'
})
export class SixthCutsComponent implements OnInit{
  requestFlag = true;
  errorResponse?: HttpErrorResponse;
  data: DatePrice[] = [];

  constructor(private httpService: HttpClientService){}
  ngOnInit(): void {
    this.loadData();
  }

  formGroup = new FormGroup({
    datePriceArray: new FormArray<FormGroup>([])
  })
  get datePriceArray(): FormArray<FormGroup>{return this.formGroup.controls.datePriceArray as FormArray<FormGroup<any>>;}
  
  getControl(arrayItem: FormGroup, controlName: string): FormControl{
      return arrayItem.controls[controlName] as FormControl;
    }

  addNewDatePrice(){
    this.addDatePrice('',);
  }

  loadData(){
    this.requestFlag = true;
    this.httpService.getSixHaircutDatePrices().subscribe({
      next: data=> { 
        this.data = []; 
        this.formGroup.controls.datePriceArray.controls = []
        this.data = data; 
      },
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.updateDataInView();
      }
    });
  }

  updateDataInView(){
    for(const pair of this.data)
      this.addDatePrice(pair.start_date_time, pair.price, true);
  }

  addDatePrice(date: string, price?: number, fromDB?: boolean){
    const datePrice = new FormGroup({
      fromDB: new FormControl(fromDB),
      date: new FormControl(date, Validators.required),
      price: new FormControl(price, [Validators.required, Validators.min(1)])
    })
    this.formGroup.controls.datePriceArray.push(datePrice);
  }
  
  onDelete(index: number){
    const datePrice: FormGroup = this.formGroup.controls.datePriceArray.controls[index];
    if(this.getControl(datePrice,"fromDB").value){
      this.requestFlag = true;
      this.httpService.deleteSixHaircutDatePrice(
        this.getControl(datePrice,"date").value
      ).subscribe({
        error: err => this.errorResponse = err,
        complete: ()=>{
          this.errorResponse = undefined;
          this.loadData();
        }
      })
    } else this.formGroup.controls.datePriceArray.removeAt(index);
  }

  onSaveAll(){
    let datePricePlain: DatePrice[] = [];
    for(const group of this.datePriceArray.controls){
      datePricePlain.push({
        start_date_time: group.controls['date'].value,
        price: group.controls['price'].value
      })
    }
    this.requestFlag = true;
    this.httpService.updateSixHaircutDatePrices(datePricePlain).subscribe({
      next: data=> { 
        this.data = []; 
        this.formGroup.controls.datePriceArray.controls = []
        this.data = data;  },
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.updateDataInView();
      }
    });
  }
}

export interface DatePrice{
  start_date_time: string,
  price: number
}