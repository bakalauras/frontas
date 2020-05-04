import { Component, OnInit } from '@angular/core';
import { EployeeRoleService } from '../shared/eployee-role.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeRole } from '../shared/employee-role.model';
import { NgForm } from '@angular/forms';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';

@Component({
  selector: 'app-employee-role-list',
  templateUrl: './employee-role-list.component.html',
  styles: []
})
export class EmployeeRoleListComponent extends KendoGridComponent implements OnInit {

  constructor(public service : EployeeRoleService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit() {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:EmployeeRole)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
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
