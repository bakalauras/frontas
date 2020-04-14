import { Component, OnInit } from '@angular/core';
import { EmployeeExamService } from '../shared/employee-exam.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-exam-form',
  templateUrl: './employee-exam-form.component.html',
  styles: []
})
export class EmployeeExamFormComponent implements OnInit {

  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  id = null;
  constructor(public service:EmployeeExamService, private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  ngOnInit(){
    this.resetForm();
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
      EmployeeId: null,
      CertificateId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeExamId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeExam().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeExam().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        //this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }
}
