import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styles: []
})
export class CustomerFormComponent implements OnInit {

  constructor(public service: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCustomerTypeList();
    this.resetForm();
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      CustomerId : 0,
      Name : '',
      Adress : '',
      CustomerTypeId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.CustomerId ==0)
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
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
  }

}
