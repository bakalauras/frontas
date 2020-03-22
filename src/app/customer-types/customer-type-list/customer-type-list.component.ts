import { Component, OnInit } from '@angular/core';
import { CustomerTypeService } from '../shared/customer-type.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerType } from '../shared/customer-type.model';

@Component({
  selector: 'app-customer-type-list',
  templateUrl: './customer-type-list.component.html',
  styles: []
})
export class CustomerTypeListComponent implements OnInit {

  constructor(public service : CustomerTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:CustomerType)
  {
    this.service.formData = Object.assign({},pd);
  }

  onDelete(CustomerTypeId)
  {
    if(confirm('Ar tikrai norite ištrinti šį įrašą?')){
    this.service.deleteRecord(CustomerTypeId)
    .subscribe(
      res => {
        this.toastr.info('Įrašas sėkmingai ištrintas');
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
