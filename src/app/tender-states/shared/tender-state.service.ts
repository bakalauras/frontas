import { Injectable } from '@angular/core';
import { TenderState } from './tender-state.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderStateService {

  formData:TenderState;
  readonly rootURL = environment.rootURL;
  list : TenderState[];
  readonly apiName = '/TenderStates';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.TenderStateId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList()
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => this.list = res as TenderState[]);
  }
}
