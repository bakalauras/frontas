import { Component, OnInit } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectStage } from '../project-stages/shared/project-stage.model';
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('lt-LT');

L10n.load({
  'lt-LT': {
      'gantt': {
           "id": "Nr",
            "name": "Vardas",
            "startDate": "Pradžios data",
            "endDate": "Pabaigos data",
            "duration": "Trukmė",
            "progress": "Progresas",
            "days": "dienos"
        },
        'grid': {
          'EmptyRecord': 'Įrašų nerasta',
          'Item': 'Įrašas',
          'Items': 'Įrašų'
      }
    }
});
@Component({
  selector: 'app-charts',
  templateUrl:  './charts.component.html',
  styleUrls: []
})
export class ChartsComponent implements OnInit {

  public data: object;
  public taskfield: object;
  public taskSettings: object;
  public columns: object[];
  readonly rootURL = environment.rootURL;
  readonly apiName = '/ProjectStages';
  list: ProjectStage;

  public ganttData: any;
  public dataManager;

  constructor(private http:HttpClient) { 
    /*this.dataManager = ejs.DataManager({
        url: "http://localhost:44341/api/ProjectStages"
    });
    this.ganttData = this.dataManager;*/
  }

  
  
  ngOnInit() {
    /*this.data = new DataManager({
      url: 'http://localhost:44341/api/ProjectStages',
      adaptor: new WebApiAdaptor,
      crossDomain: true
  });*/

  //this.data =this.chartService.getData();
  this.ganttData= this.http.get(this.rootURL+'/projects/'+1+'/projectStages').
    toPromise()
    .then(res => this.list = res as ProjectStage);
    this.ganttData = this.dataManager;


  this.taskSettings = {
    id: 'ProjectStageId',
      startDate: 'StartDate',
      endDate: 'EndDate'
  };
  this.columns = [
      { field: 'ProjectStageId', headerText: 'ID', width: '250', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate' },
      { field: 'EndDate' }
  ];

  this.data = [{
  TaskID: 1,
  TaskName: 'Analizė',
  StartDate: new Date('04/02/2019'),
  EndDate: new Date('04/04/2019')
  }, 
  {
    TaskID: 2,
    TaskName: 'Projektavimas',
    StartDate: new Date('04/05/2019'),
    EndDate: new Date('05/21/2019'),
    },
  { TaskID: 3, TaskName: 'Programavimas', StartDate: new Date('05/21/2019'), Duration: 0, Predecessor: '3,4' },]; 
  this.taskfield = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  child: 'subtasks'
  };
  }

}

