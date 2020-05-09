import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectStage } from '../project-stages/shared/project-stage.model';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Gantt } from '@syncfusion/ej2-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { ChartService } from './shared/chart.service';
import { NgForm } from '@angular/forms';
import { Project } from '../projects/shared/project.model';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';

setCulture('lt-LT');

L10n.load({
  'lt-LT': {
      'gantt': {
           "id": "Nr",
            "name": "Pav",
            "startDate": "Pradžios data",
            "endDate": "Pabaigos data",
            "duration": "Trukmė",
            "progress": "Progresas",
            "days": "dienos"
        },
        'grid': {
          'EmptyRecord': 'Įrašų nerasta',
          'Item': 'Įrašas'
      }
    }
});
@Component({
  selector: 'app-charts',
  templateUrl:  './charts.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ChartsComponent extends KendoGridComponent implements OnInit {

  public taskSettings: object;
  public columns: object[];
  public namesStage: object[];
  list: ProjectStage[];
  public holidays: object[];
  public timelineSettings: object;

public ganttData: object[];
readonly rootURL = environment.rootURL;
  constructor(private http:HttpClient, public service: ChartService) {
    super();
  }

  ngOnInit() {
    this.service.refreshProjectList();
    this.resetForm();
    this.service.getData().subscribe(data => {
      console.log(data);
      this.list = data;
    })

  this.taskSettings = {
    id: 'ProjectStageNameId',
    name: 'ProjectStageNameId',
    startDate: 'StartDate',
    endDate: 'EndDate',
    baselineStartDate: 'ScheduledStartDate',
    baselineEndDate: 'ScheduledEndDate'
};
this.columns = [
    { field: 'ProjectStageNameId', headerText: 'Nr.', width: '60', clipMode: 'EllipsisWithTooltip' },
    { field: 'StartDate', headerText: 'Pradžios data', width: '70' },
    { field: 'EndDate' , headerText: 'Pabaigos data', width: '70'}
];
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ProjectId : 0,
      Title : '',
      ContractNumber : '',
      Budget : 0,
      CustomerId : null,
      Customer : null,
      TenderId : null
    }
  }

  onSubmit(form:NgForm){
    this.service.getDataa(form).subscribe(data => {
      console.log(data);
      this.list = data;
    })
  }

  populateForm(pd:Project){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }
  
}

