import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { NavLink } from './nav-link';
import { AsyncPipe, NgClass,  TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../http/http-client.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, TitleCasePipe, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  menuActive: boolean = false;
  assetPath = environment.assetPath;
  language: "RU" | "EN" = "EN";

  flagRus: string = this.assetPath + 'assets/images/rus.png';
  flagUS: string = this.assetPath + 'assets/images/us.png';
  flagPath =  this.flagUS;
  audio = new Audio();
  timeoutId: any;
  lastTransactionTime?: Date;
  checkInterval:number = 60000;
  links : NavLink[] = [
    {text:'Summary',      url:'summary',      access_level: 1},
    {text:'Transactions', url:'transactions', access_level: 1},
    {text:'Money',        url:'money',        access_level: 1},
    {text:'Schedule',     url:'schedule',     access_level: 1},
    {text:'Users',        url:'users',        access_level: 3}
  ];

  constructor(public authService: AuthenticationService, public translate: TranslateService, public httpService: HttpClientService){}

  ngOnDestroy(): void {
    clearInterval(this.timeoutId);
  }

  ngOnInit(): void {
    this.audio.src = this.assetPath + 'assets/sounds/cashregister.mp3';
    this.audio.load();
    this.timeoutId = setInterval(()=>this.checkNewTransactions(),this.checkInterval);
  }

  logout(){
    this.authService.logout();
  }
  
  onBurgerClick(){
    this.menuActive = !this.menuActive;
  }

  changeLang(){
    this.translate.use(this.language.toLowerCase());
    if(this.language === "RU"){
      this.language = "EN";
      this.flagPath = this.flagUS;
      
    }
    else{
      this.language = "RU";
      this.flagPath = this.flagRus;
    }    
  }

  checkNewTransactions(){
    if(!this.authService.isAuthenticated) return;
    this.httpService.getLastTransactionTime()
      .subscribe(date=>{
        if(this.lastTransactionTime && this.lastTransactionTime < date)
          this.audio.play();
        this.lastTransactionTime = date;
      });
  }
}


