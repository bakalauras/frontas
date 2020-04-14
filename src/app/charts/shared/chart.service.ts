import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  readonly rootURL = environment.rootURL;
  readonly apiName = '/ProjectStages';
  list:ProjectStage[];

  get(): Observable<any> {
    return this.http.get(this.rootURL+this.apiName);
  }

  getData(){
    return this.http.get(this.rootURL+this.apiName)
    .toPromise()
    .then(res =>this.list=res as ProjectStage[])
  }

  constructor(private http:HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return (result as any);
    };
  }
}
