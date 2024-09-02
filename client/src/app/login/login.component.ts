import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { ErrorComponent } from "../elements/error/error.component";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('username') userInput?: ElementRef;
  @ViewChild('password') passInput?: ElementRef;
  errorResponse?: HttpErrorResponse;
  requestFlag: boolean = false;

  constructor(private httpService: HttpClientService, private authService: AuthenticationService){}

  login(){
    let username = (this.userInput?.nativeElement as HTMLInputElement).value;
    let password = (this.passInput?.nativeElement as HTMLInputElement).value;
    this.requestFlag = true;
    this.authService.login(username, password).subscribe({
      error: err => {
        if(err.status === 406){
          this.errorResponse = {error: true , message: "Invalid username or password"} as HttpErrorResponse
        } else if(err.status === 423){
          this.errorResponse = {error: true, message: "You're temporarily locked out. Try again in 5 minutes"} as HttpErrorResponse
        } 
        else this.errorResponse = err;
        this.requestFlag = false;
      },
      complete: ()=> {
        this.requestFlag = false;
        this.errorResponse = undefined;
      }
    });
    

  }

}