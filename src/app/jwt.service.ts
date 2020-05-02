import { Injectable } from '@angular/core';
import { User } from './users/shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  formData:User;
  readonly rootURL = environment.rootURL;;
  httpClient1 : HttpClient;

  constructor(private httpClient: HttpClient) {
    this.httpClient1 = httpClient;
  }

  postAuth(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient1.post(this.rootURL+'/Auth',this.formData, { responseType: 'text' as 'json'})
    .pipe(tap(res => {
      localStorage.setItem('access_token', res.toString());
      var token = localStorage.getItem('access_token');
    var decoded = jwt_decode(token);
    //var role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    //localStorage.setItem('role', role);
    var id = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    localStorage.setItem('id', id);
    }))
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    //localStorage.removeItem('role');
    window.location.href = 'login';
  }
  
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public get isTokenExpired(): boolean {
    const token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  canActivate() {
    if (!this.isTokenExpired) {
      return true;
    }

    window.location.href = 'login';
    return false;
  }

}
