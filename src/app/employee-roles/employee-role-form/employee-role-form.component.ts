import { Component, OnInit } from '@angular/core';
import { EployeeRoleService } from '../shared/eployee-role.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-role-form',
  templateUrl: './employee-role-form.component.html',
  styles: []
})
export class EmployeeRoleFormComponent implements OnInit {

  constructor(public service: EployeeRoleService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      EmployeeRoleId : 0,
      Title : '',
      AverageWage : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.EmployeeRoleId ==0)
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
       // this.service.refreshList();
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
       // this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
