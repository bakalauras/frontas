import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContestService } from '../shared/contest.service';
import { Contest } from '../shared/contest.model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { State , process} from '@progress/kendo-data-query';

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styles: []
})
export class ContestListComponent implements OnInit {

  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 20
  };

  constructor(public service : ContestService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCustomerList();
    this.service.refreshContestStatusList();
    this.service.refreshList();
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
