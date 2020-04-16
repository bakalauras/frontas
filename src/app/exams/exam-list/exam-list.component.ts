import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { ToastrService } from 'ngx-toastr';
import { Exam } from '../shared/exam.model';
import { NgForm } from '@angular/forms';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styles: []
})
export class ExamListComponent extends KendoGridComponent implements OnInit {

  constructor(public service:ExamService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit(){
    this.service.refreshList(this.loadItems.bind(this));
    this.service.refreshCertificateList();
    this.resetForm();
  }

  populateForm(pd:Exam){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteExam(this.idToDelete)
      .subscribe(res =>{
        this.toastr.info('Ištrinta sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ExamId: 0,
      Title: '',
      Code: '',
      Order: null,
      CertificateId: null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ExamId ==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postExam().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putExam().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
