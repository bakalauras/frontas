import { Component, OnInit } from '@angular/core';
import { ProjectStageService } from '../shared/project-stage.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectStage } from '../shared/project-stage.model';
import { Router, ActivatedRoute } from '@angular/router';
import { State, process } from '@progress/kendo-data-query';
import { DataStateChangeEvent, PageChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-project-stage-list',
  templateUrl: './project-stage-list.component.html',
  styles: []
})
export class ProjectStageListComponent implements OnInit {

  id = null;
  stageRoute = null;
  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 20
  };
  constructor(public service : ProjectStageService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
      this.stageRoute = '/project/'+this.id+'/stage/';
    }

  ngOnInit() {
    this.service.refreshProjectStageNamesList();
    this.service.refreshProjectsList();
    this.service.refreshList(this.id);
    this.delay(5).then(any => {
      this.loadItems();
  });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}

public dataStateChange(state: DataStateChangeEvent): void {
  this.state = state;
  this.gridView = process(this.service.list, this.state);
}

public pageChange({ skip, take }: PageChangeEvent): void {
  this.state.skip = skip;
  this.state.take = take;
  this.loadItems();
}

private loadItems(): void {
 this.gridView = process(this.service.list, this.state);
 this.excelExport = this.gridView;
}

}
