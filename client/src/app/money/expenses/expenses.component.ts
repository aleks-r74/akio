import { Component, OnInit } from '@angular/core';
import { ExpensesDto } from '../../interfaces/expenses/ExpensesDto.interface';
import { SelectComponent } from "../../elements/select/select.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { directionValidator } from '../money-management/transfer-form/direction-validator';
import { HttpClientService } from '../../http/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { toRealValue,toTitleCase } from '../../elements/select/utilities.functions';
import { ErrorComponent } from "../../elements/error/error.component";
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, ErrorComponent, TranslateModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit{
  errorResponse?: HttpErrorResponse;
  requestFlag = false;
  options: string[] = [];
  expenses: ExpensesDto[] = [];

  constructor(private httpService: HttpClientService){}

  ngOnInit(): void {
    this.requestFlag = true;
    this.httpService.getContainers().subscribe({
      next: (data)=>{ this.options = data.containers.map(c=>c.containerName); },
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.errorResponse = undefined;
        this.loadExpenses();
      }
    });
    
  }

  formGroup = new FormGroup({
    expenses: new FormArray<FormGroup>([])
  })
  
  get expensesArray(): FormArray<FormGroup>{return this.formGroup.controls.expenses as FormArray<FormGroup<any>>;}
  
  getControl(arrayItem: FormGroup, controlName: string): FormControl{
    if(arrayItem.controls[controlName] instanceof FormControl){
      return arrayItem.controls[controlName] as FormControl;
    } else {
      const group =  arrayItem.controls['direction'] as FormGroup;
      return group.controls[controlName] as FormControl;
    }
    
  }

  private loadExpenses(){
    this.requestFlag = true;
    this.httpService.getExpenses().subscribe({
      next: data=> this.expenses = data,
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.updateExpensesInView();
      }
    });
  }

  private updateExpensesInView(){
    this.formGroup.controls.expenses.clear();
    for(const expense of this.expenses){
      this.createExpense(expense.source, expense.dest, expense.amount, expense.due_day, expense.percent, expense.description, expense.id);
    }
  }

  createExpense(from: string, to: string, amount: number | null, dueDay: number | null, percent: number | null, descr: string, id?: number){
    const formGroup = new FormGroup({
      id: new FormControl(id),
      direction: new FormGroup({
        source: new FormControl(toTitleCase(from)),
        dest: new FormControl(toTitleCase(to)),
      }, directionValidator),
      amount: new FormControl(amount),
      due_day: new FormControl(dueDay),
      percent: new FormControl(percent),
      descr: new FormControl(descr, Validators.required)
    })
    this.formGroup.controls.expenses.push(formGroup);
  }

  onAdd(){
    this.createExpense('From','To',null,null,null,'');
  }

  onSave(){
    let expensesArray: ExpensesDto[] = [];
    for(const expense of this.formGroup.controls.expenses.controls){
      expensesArray.push({
        id: expense.controls['id']?.value,
        source: toRealValue(this.options, (expense.controls['direction'] as FormGroup).controls['source'].value)!,
        dest: toRealValue(this.options, (expense.controls['direction'] as FormGroup).controls['dest'].value)!,
        due_day: expense.controls['due_day']?.value ? expense.controls['due_day'].value : null,
        amount: expense.controls['amount']?.value ? expense.controls['amount'].value: null,
        percent: expense.controls['percent']?.value ? expense.controls['percent'].value : null,
        description: expense.controls['descr']?.value
      })
    }
    this.requestFlag = true;
    this.httpService.updateExpenses(expensesArray).subscribe({
      next: data=> {this.expenses = data;},
      error: err => this.errorResponse = err,
      complete: ()=>{
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.updateExpensesInView();
      }
    });
  }


  onDelete(index: number){
    const expenseFormGroup = this.expensesArray.controls[index];
    const id = this.getControl(expenseFormGroup,'id').value;
    if(id){
      this.requestFlag = true;
      this.httpService.deleteExpense(id).subscribe({
        error: err => this.errorResponse = err,
        complete: ()=>{
          this.errorResponse = undefined;
          this.loadExpenses();
        }
      })
    } else this.expensesArray.removeAt(index); 
  }



  
}
