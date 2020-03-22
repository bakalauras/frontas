import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../shared/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styles: []
})
export class CustomerListComponent implements OnInit {

  constructor(public service : CustomerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshCustomerTypeList();
    this.service.refreshList();
    
  }

  populateForm(pd:Customer)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(CustomerId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(CustomerId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
        this.service.refreshCustomerTypeList();
        this.service.refreshList();
      },
      err => {
        console.log(err)
        this.toastr.error('Įvyko klaida');
      }
    )
    }
  }

}
