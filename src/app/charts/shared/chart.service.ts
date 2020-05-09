import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectStage } from 'src/app/project-stages/shared/project-stage.model';
import { Project } from 'src/app/projects/shared/project.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  readonly rootURL = environment.rootURL;
  readonly apiName = '/ProjectStages';
  list:ProjectStage[];
  listProjects : Project[];
  formData:Project

  get(): Observable<any> {
    return this.http.get(this.rootURL+this.apiName);
  }

  refreshList(){
    this.http.get(this.rootURL + '/projects/1/projectStages')
    .toPromise()
    .then(res =>this.list = res as ProjectStage[])
  }

  refreshProjectList()
  {
    this.http.get(this.rootURL+'/projects').
    toPromise()
    .then(res => this.listProjects = res as Project[]);
  }

  getData(){
    return this.http.get<ProjectStage[]>(this.rootURL + '/projects/1/projectStages');
    
  }

  getDataa(form:NgForm){
    return this.http.get<ProjectStage[]>(this.rootURL + '/projects/'+this.formData.ProjectId+'/projectStages');
    
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
