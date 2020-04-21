import { Injectable } from '@angular/core';
import { CpiMeasure } from './cpi-measure.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CpiMeasureService {

  formData:CpiMeasure;
  readonly rootURL = environment.rootURL;
  list : CpiMeasure[];
  readonly apiName = '/CPIMeasures';

  constructor(private http:HttpClient) { }

  postRecord(){
    return this.http.post(this.rootURL+this.apiName,this.formData);
  }

  putRecord(){
    return this.http.put(this.rootURL+this.apiName+'/'+this.formData.CPIMeasureId,this.formData);
  }

  deleteRecord(id){
    return this.http.delete(this.rootURL+ this.apiName+'/'+id);
  }

  refreshList(id, callBack)
  {
    if(id!=0)
    {
      this.http.get(this.rootURL+'/ProjectStages/'+id+'/stageCPI').
    toPromise()
    .then(res => {this.list = res as CpiMeasure[], callBack(this)});
    }
  }
}