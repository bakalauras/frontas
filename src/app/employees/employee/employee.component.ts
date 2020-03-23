import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Duty } from 'src/app/duties/shared/duty.model';
import { Employee } from '../shared/employee.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  
  foods: Food[] = [
    {value: 'Vardenis Pavardenis', viewValue: 'Vardenis Pavardenis'},
    {value: 'Jonas Jonaitis', viewValue: 'Jonas Jonaitis'},
    {value: 'Ona Onaitė', viewValue: 'Ona Onaitė'}
  ];

  constructor(public service:EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm) {
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
    this.service.postEmployee(form.value).subscribe(
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
    this.service.putEmployee(form.value).subscribe(
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
