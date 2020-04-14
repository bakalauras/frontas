import { Component, OnInit } from '@angular/core';
import { WorkingTimeRegisterService } from '../shared/working-time-register.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-working-time-register-form',
  templateUrl: './working-time-register-form.component.html',
  styles: []
})
export class WorkingTimeRegisterFormComponent implements OnInit {

  id2 = null;
  constructor(public service: WorkingTimeRegisterService,
    private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      this.id2 = this.route.snapshot.paramMap.get('id2');
    }

  ngOnInit() {
    this.service.refreshEmployeeRoleList();
    this.service.refreshEmployeeList();
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      WorkingTimeRegisterId : 0,
      DateFrom : null,
      DateTo : null,
      Hours : 0,
      ProjectStageId : this.id2,
      EmployeeRoleId : 0,
      EmployeeId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.WorkingTimeRegisterId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
       // this.service.refreshList(this.id2);
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        //this.service.refreshList(this.id2);
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
