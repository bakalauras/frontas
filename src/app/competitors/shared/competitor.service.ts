import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competitor } from './competitor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {

  formData:Competitor;
  readonly rootURL = environment.rootURL;
  list : Competitor[];
  readonly apiName = '/Competitors';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.CompetitorId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(callBack)
  {
    this.http.get(this.rootURL+this.apiName).
    toPromise()
    .then(res => {this.list = res as Competitor[], callBack(this)});
  }
}