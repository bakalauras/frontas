import { Component, OnInit } from '@angular/core';
import { GroupRightsService } from '../shared/group-rights.service';
import { ToastrService } from 'ngx-toastr';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { GroupRights } from '../shared/group-rights.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group-rights-list',
  templateUrl: './group-rights-list.component.html',
  styles: []
})
export class GroupRightsListComponent extends KendoGridComponent implements OnInit {

  constructor(public service: GroupRightsService, private toastr: ToastrService) { 
    super();
  }

  ngOnInit(): void {
    this.service.refreshList(this.loadItems.bind(this));
    this.resetForm();
  }

  populateForm(pd:GroupRights){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteGroupRights(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      GroupRightId: 0,
      Title: '',
      manageClassifiers: false,
      manageContests: false,
      manageTenders: false,
      manageProjects: false,
      manageEmployees: false,
      manageUsers: false,
      manageCustomers: false
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.GroupRightId ==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postGroupRights().subscribe(
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

  updateRecord(form:NgForm)
  {
    this.service.putGroupRights().subscribe(
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
