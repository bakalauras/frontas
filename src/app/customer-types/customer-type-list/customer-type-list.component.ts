import { Component, OnInit } from '@angular/core';
import { CustomerTypeService } from '../shared/customer-type.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerType } from '../shared/customer-type.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-type-list',
  templateUrl: './customer-type-list.component.html',
  styles: []
})
export class CustomerTypeListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : CustomerTypeService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:CustomerType)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0)
    {
      this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
    }
    
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      CustomerTypeId : 0,
      Type : ''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.CustomerTypeId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.loadItems.bind(this));
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
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
