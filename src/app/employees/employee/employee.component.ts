import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [],
  providers: [DatePipe]
})
export class EmployeeComponent implements OnInit {

  id = null;
  public opened = false;
  constructor(public service:EmployeeService, private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter) { }
    }

  ngOnInit() {
    //this.service.refreshList();
    this.resetForm();
  }

  public close(status) {
    if(status =='yes')
    {
      this.deleteRecord(this.id)
    }
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  resetForm(form?:NgForm) {
    this.service.getRecord(this.id)
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeId: 0,
      Name : '',
      Surname: '',
      IsActive: false,
      FkEmployeeId: null
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
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.router.navigateByUrl('/employee/'+res.EmployeeId);
        this.id = res.EmployeeId;
        this.service.formData.EmployeeId = res.EmployeeId;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployee().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  deleteRecord(EmployeeId){
      this.service.deleteEmployee(EmployeeId)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.router.navigateByUrl('/employees');
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
  }

}
