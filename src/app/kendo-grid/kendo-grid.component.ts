import { Component, OnInit } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, PDFModule, PageSizeItem  } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styles: []
})
export class KendoGridComponent implements OnInit {

  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 20
};
  public pageSizes = [5, 10, 20, 30];
  public opened = false;
  public opened2 = false;
  public idToDelete = 0;

  constructor() {}

  ngOnInit(): void {
  }

  public dataStateChange(state: DataStateChangeEvent, service): void {
    this.state = state;
    this.gridView = process(service.list, this.state);
  }
  
  public pageChange({ skip, take }: PageChangeEvent, service): void {
    this.state.skip = skip;
    this.state.take = take;
    this.loadItems(service);
  }
  
  public loadItems(service): void {
   this.gridView = process(service.list, this.state);
   this.excelExport = this.gridView;
  }

  public open(id) {
    this.opened = true;
    this.idToDelete = id;
  }
  public open2() {
    this.opened2 = true;
  }

  public close() {
    this.opened = false;
    this.opened2 = false;
    this.resetForm();
  }

  public resetForm(form?: NgForm) {}

}
