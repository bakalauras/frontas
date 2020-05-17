import { Injectable } from '@angular/core';
import { User } from './users/shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  formData:User;
  readonly rootURL = environment.rootURL;;
  httpClient1 : HttpClient;

  constructor(private httpClient: HttpClient, public toastr: ToastrService) {
    this.httpClient1 = httpClient;
  }

  postAuth(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient1.post(this.rootURL+'/Auth',this.formData, { responseType: 'text' as 'json'})
    .pipe(tap(res => {
      localStorage.setItem('access_token', res.toString());
      var token = localStorage.getItem('access_token');
      var decoded = jwt_decode(token);
      var rights = decoded['Rights'];
      localStorage.setItem('rights', rights);
      var id = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      localStorage.setItem('id', id);
    }))
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('rights');
    window.location.href = 'login';
  }
  
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getRightsString(): string {
    return localStorage.getItem('rights');
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

  canActivate(route: ActivatedRouteSnapshot) {
    if(this.isTokenExpired)
    {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id');
      localStorage.removeItem('rights');
      window.location.href = 'login';
      return false;
    }
    const expectedRight = route.data.expectedRightPos;
    if(expectedRight==-1)
        return true;
    var rights = this.getRightsString();
    if (rights[expectedRight]=="1") {
        return true;
    }
    this.toastr.error('Neturite teisės prieiti prie šių duomenų');
    return false;
  }
}