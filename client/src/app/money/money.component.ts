import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-money',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    TranslateModule
   ],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent{
 
constructor(public authService: AuthenticationService){}
  
}
