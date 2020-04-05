import { Component, OnInit } from '@angular/core';
import { TenderService } from '../shared/tender.service';
import { ToastrService } from 'ngx-toastr';
import { Tender } from '../shared/tender.model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styles: []
})
export class TenderListComponent implements OnInit {

  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 20
  };

  constructor(public service : TenderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshTenderStateList();
    this.service.refreshContestsList();
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
