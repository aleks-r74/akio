import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserDto } from '../../interfaces/users/usersDto.interface';
import { TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [TitleCasePipe, TranslateModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnChanges{
  @Output() delete = new EventEmitter<string>();
  @Output() changePass = new EventEmitter<string>();
  @Input() users!: UserDto[];

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['users']) return;
    for(let i=0; i< this.users.length; i++)
      for(let j=0; j< this.users[i].authorities!.length; j++)
       this.users[i].authorities![j]=this.users[i].authorities![j].slice(5);

  }

  onChangePsw(user: string){
   this.changePass.emit(user);
  }
  onDelete(user: string){
    this.delete.emit(user);
  }
}
