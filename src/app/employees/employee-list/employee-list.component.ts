import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { State, process } from '@progress/kendo-data-query';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: []
})
export class EmployeeListComponent extends KendoGridComponent implements OnInit {
  
  constructor(public service:EmployeeService, private toastr: ToastrService) {
    super();
   }

  ngOnInit(){
    this.service.refreshList(this.loadItems.bind(this));
  }
}
