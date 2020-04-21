import { Component, OnInit } from '@angular/core';
import { EmployeeExamService } from '../shared/employee-exam.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeExam } from '../shared/employee-exam.model';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { State, process } from '@progress/kendo-data-query';
import { Router, ActivatedRoute } from '@angular/router';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-exam-list',
  templateUrl: './employee-exam-list.component.html',
  styles: []
})
export class EmployeeExamListComponent extends KendoGridComponent implements OnInit {

  id = null;
  
  constructor(public service:EmployeeExamService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); 
    }
  ngOnInit(){
    this.service.refreshEmployeeExamList(this.id);
    this.service.refreshExamList();
    this.service.refreshCertificateList();
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:EmployeeExam){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0)
    {
      this.service.deleteEmployeeExam(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeExamId: 0,
      PlannedExamDate: null,
      RealExamDate: null,
      IsPassed: true,
      Price: 0,
      File: '',
      ExamId: null,
      EmployeeId: this.id,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeExamId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeExam().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeExam().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }
}
