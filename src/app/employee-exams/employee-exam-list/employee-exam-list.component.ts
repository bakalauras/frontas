import { Component, OnInit } from '@angular/core';
import { EmployeeExamService } from '../shared/employee-exam.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeExam } from '../shared/employee-exam.model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { State, process } from '@progress/kendo-data-query';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-exam-list',
  templateUrl: './employee-exam-list.component.html',
  styles: []
})
export class EmployeeExamListComponent implements OnInit {

  id = null;
  examRoute = null;
  public gridView: GridDataResult;
  public excelExport: ExcelExportData;
  public state: State = {
    skip: 0,
    take: 20
  };
  
  constructor(public service:EmployeeExamService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); 
      this.examRoute = '/employee/'+this.id+'/exam/';
    }
  ngOnInit(){
    this.service.refreshEmployeeExamList(this.id);
    this.service.refreshExamList();
    this.service.refreshCertificateList();
    this.service.refreshList();
    this.service.refreshExamList();
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
  populateForm(pd:EmployeeExam){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(EmployeeExamId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteEmployeeExam(EmployeeExamId)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }

}
