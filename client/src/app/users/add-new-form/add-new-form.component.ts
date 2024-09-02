import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from "../../elements/modal/modal.component";
import { ConfirmationComponent } from "../../elements/confirmation/confirmation.component";
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { HttpClientService } from '../../http/http-client.service';
import { UserDto } from '../../interfaces/users/usersDto.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-new-form',
  standalone: true,
  imports: [ModalComponent, ConfirmationComponent, ReactiveFormsModule, TitleCasePipe, TranslateModule],
  templateUrl: './add-new-form.component.html',
  styleUrl: './add-new-form.component.css'
})
export class AddNewFormComponent implements OnChanges{

  @Input() showWindow = false;
  @Input() authorities!: string[];
  @Output() close = new EventEmitter<Observable<UserDto[]>>();

  constructor(private httpService: HttpClientService){}

  newUserForm: FormGroup = new FormGroup({
    checkboxes: new FormArray<NamedFormControl>([]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  get checkboxes(): FormArray<NamedFormControl> {return this.newUserForm.controls['checkboxes'] as FormArray<NamedFormControl>; }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['authorities']) return;
    this.authorities.forEach(auth=>{
      let newCheckbox = new NamedFormControl('');
      newCheckbox.name = auth.slice(5);
      this.checkboxes.push(newCheckbox)
    })
  }
  

  onConfirmClick(confirm: boolean){
    if(confirm){
      const username = this.newUserForm.controls?.['username'].value;
      const password = this.newUserForm.controls?.['password'].value;
      const selectedAuthorities = this.checkboxes.controls.filter(chkbx=>chkbx.value).map(chkbx=>'ROLE_' + chkbx.name)
      let newUser: UserDto = {username: username, password: password, authorities: selectedAuthorities};
      this.close.emit(this.httpService.addNewUser(newUser));
      this.checkboxes.controls.forEach(chkbx=>chkbx.setValue(false));
      Object.entries(this.newUserForm.controls).forEach(([key, control]) => {
        if (control instanceof FormControl) control.setValue('');
      });
      return;
    }
    
    this.close.emit(undefined);    
  }
}

class NamedFormControl extends FormControl{
  name: string='';
  constructor(initialValue: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
    super(initialValue, validator, asyncValidator);
  }
}


