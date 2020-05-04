import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData:User;
  readonly rootURL = environment.rootURL;
  list : User[];
  readonly apiName = '/Users';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.UserId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as User[], callBack(this)});
  }
}
