import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from './http/http-client.service';
import { AsyncSubject, Observable, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private username = 'username';
  private access_level = 'access_level';

  constructor(private httpService: HttpClientService, private router: Router) {}

  login(username: string, password: string): Observable<HttpResponse<void>> {
    return this.httpService.login({username: username, password: password, authorities: []})
    .pipe(
      tap((data)=>{
        const token = data.headers.get('token');
        if(token) this.storeToken(token);
        this.router.navigate(['/summary']);
      })
    );
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getAccessLevel(): number {
    let access_level = localStorage.getItem(this.access_level);
    if(!access_level) access_level="1";
    return parseInt(access_level);
  }

  getUsername(): string{
    const username =  localStorage.getItem(this.username);
    return username ? username : "";
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem("access_level", JSON.parse(atob(token.split('.')[1])).access_level);
    localStorage.setItem("username", JSON.parse(atob(token.split('.')[1])).sub);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.username);
    localStorage.removeItem(this.access_level);
  }
}
