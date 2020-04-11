import { Component, OnInit } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts',
  templateUrl:  './charts.component.html',
  styleUrls: []
})
export class ChartsComponent implements OnInit {

  public data: object;
  public taskfield: object;
  /*public columns: object[];
  readonly rootURL = environment.rootURL;
  readonly apiName = '/ProjectStages';*/
  constructor(private http:HttpClient) { }
  ngOnInit() {

    /*this.data = new DataManager({
      url: 'http://localhost:44341/api/ProjectStages',
      adaptor: new WebApiAdaptor,
      crossDomain: true
  });*/

  /*this.data =this.chartService.getData();

  this.taskSettings = {
    id: 'ProjectStageId',
      startDate: 'StartDate',
      endDate: 'EndDate'
  };
  this.columns = [
      { field: 'ProjectStageId', headerText: 'ID', width: '250', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate' },
      { field: 'EndDate' }
  ];*/

  this.data = [{
  TaskID: 1,
  TaskName: 'Analizė',
  StartDate: new Date('04/02/2019'),
  EndDate: new Date('04/04/2019'),
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

