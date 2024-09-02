import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { directionValidator } from './direction-validator';
import { MoneyFlowDto } from '../../../interfaces/money/moneyFlowDto.interface';
import { SelectComponent } from "../../../elements/select/select.component";
import { toRealValue } from '../../../elements/select/utilities.functions';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, SelectComponent, TranslateModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent {
 //@Input() containerNames?: string[];
 @Input() sources: string[] = [];
 @Input() dests: string[] = [];
 @Output() moneyFlowEvent = new EventEmitter<MoneyFlowDto>();
 
  transferForm = new FormGroup({
    direction: new FormGroup(
      {
        source: new FormControl('From',Validators.required),
        dest: new FormControl('To',Validators.required),
      }, directionValidator
    ),
    amount: new FormControl('',[Validators.required,Validators.min(1)]),
    descr: new FormControl('',Validators.required)
  });
  get sourceControl(): FormControl  {return this.transferForm.controls.direction.controls.source as FormControl;}
  get destControl(): FormControl  {return this.transferForm.controls.direction.controls.dest as FormControl;}

  onSubmit(){
    let formSource = this.transferForm.controls.direction.get('source')!.value!;
    let formDest = this.transferForm.controls.direction.get('dest')!.value!;
    formSource = toRealValue(this.sources, formSource)!;
    formDest = toRealValue(this.dests, formDest)!;
    
    const moneyFlow :MoneyFlowDto = {
      source: formSource,
      dest:   formDest,
      amount: parseFloat(this.transferForm.controls.amount!.value!),
      description:  this.transferForm.controls.descr.value!
    }

    this.transferForm.controls.amount.setValue('');
    this.transferForm.controls.descr.setValue('');
    this.moneyFlowEvent.emit(moneyFlow)
    
   }
   



}
