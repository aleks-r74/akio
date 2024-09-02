import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserTableComponent } from "./user-table/user-table.component";
import { AddNewComponent } from "./add-new/add-new.component";
import { UserDto } from '../interfaces/users/usersDto.interface';
import { ModalComponent } from "../elements/modal/modal.component";
import { ConfirmationComponent } from "../elements/confirmation/confirmation.component";
import { AddNewFormComponent } from "./add-new-form/add-new-form.component";
import { HttpClientService } from '../http/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorComponent } from "../elements/error/error.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserTableComponent, AddNewComponent, ModalComponent, ConfirmationComponent, AddNewFormComponent, ErrorComponent, TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  modalAddNewVisible = false;
  modalChangePswVisible = false;
  modalDeleteVisible = false;
  selectedUser!: string;
  requestFlag = false;
  errorResponse?: HttpErrorResponse;
  passUpdated = false;

  @ViewChild('pswInput') pswInput!: ElementRef;
  authorities: string[] = [];
  users: UserDto[] = [];

  constructor(private httpService: HttpClientService){}
  ngOnInit(): void {
    this.httpService.getAllAuthorities().subscribe({
      next: data => this.authorities = data,
      error: err => this.errorResponse = err,
      complete: () => {
        this.requestFlag = false;
        this.errorResponse = undefined;
        this.loadUsers();
      }
    })
    
  }

  onAddNew(){
    this.modalAddNewVisible = true;
  }

  onAddNewClose(o: Observable<UserDto[]>){
    this.modalAddNewVisible=false;
    if(!o) return;
    this.requestFlag = true;
    o.subscribe({
      next: (data)=> {this.users = []; this.users = data;},
      error: err=>this.errorResponse = err,
      complete: () => {
        this.requestFlag = false;
        this.errorResponse = undefined;
      }
    })
    
  }

  // show confirmation dialog
  onPassIconClick(user: string){
    this.selectedUser = user;
    this.modalChangePswVisible = true;
  }
  // show confirmation dialog
  onDeleteIconClick(user: string){
    this.selectedUser = user;
    this.modalDeleteVisible = true;
  }

  onDeleteConfirm(confirm: boolean){
    if(confirm){
      this.requestFlag = true;
      this.httpService.deleteUser(this.selectedUser).subscribe({
        next: (data)=> {this.users = []; this.users = data;},
        error: err=>this.errorResponse = err,
        complete: () => {
          this.requestFlag = false;
          this.errorResponse = undefined;
        }
      });
    }

    this.modalDeleteVisible = false;
  }

  onPassChangeConfirm(confirm: boolean){
    const input = this.pswInput.nativeElement as HTMLInputElement;
    if(confirm) {
      // make a request to change the password
      this.requestFlag = true;
      this.httpService.updateUserPassword({username: this.selectedUser, password: input.value, authorities: []}).subscribe({
        next: ()=> {},
        error: err=>this.errorResponse = err,
        complete: () => {        
          this.requestFlag = false;
          this.errorResponse = undefined;
          this.passUpdated = true;
          setTimeout(()=>this.passUpdated=false,3000);
        }
      })
      input.value='';
    };    
    input.value='';
    this.modalChangePswVisible = false;
  }


  private loadUsers(){
    this.requestFlag = true;
    this.httpService.getAllUsersWithAuthorities().subscribe({
      next: data => {this.users = []; this.users = data},
      error: err => this.errorResponse = err,
      complete: () => {
        this.requestFlag = false;
        this.errorResponse = undefined;
      }
    })
  }
}
