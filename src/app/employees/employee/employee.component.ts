import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Duty } from 'src/app/duties/shared/duty.model';
import { Employee } from '../shared/employee.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  id = null;
  constructor(public service:EmployeeService, private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter) { }
    }

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    this.service.getRecord(this.id)
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeId: 0,
      Name : '',
      Surname: '',
      IsActive: true,
      FkEmployeeId: 0
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployee().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployee().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.info('Išsaugota sėkmingai');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
