import { Component, OnInit } from '@angular/core';
import { EmployeeCompetencyService } from '../shared/employee-competency.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCompetency } from '../shared/employee-competency.model';
import { KendoGridComponent } from 'src/app/kendo-grid/kendo-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-competency-list',
  templateUrl: './employee-competency-list.component.html',
  styles: []
})
export class EmployeeCompetencyListComponent extends KendoGridComponent implements OnInit {

  id = null;
  
  constructor(public service:EmployeeCompetencyService, private toastr: ToastrService, private router: Router,
    public route: ActivatedRoute) { 
      super();
      this.id = this.route.snapshot.paramMap.get('id'); 
    }

  ngOnInit(){
    this.service.refreshList(this.id, this.loadItems.bind(this));
    this.service.refreshCompetencyList();
    this.resetForm();
  }

  populateForm(pd:EmployeeCompetency){
    this.service.formData = Object.assign({}, pd);
    this.opened2 = true;
  }

  onDelete(){
    this.opened = false;
    if(this.idToDelete!=0){
      this.service.deleteEmployeeCompetency(this.idToDelete)
      .subscribe(res =>{
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
        err => {
          console.log(err);
          this.toastr.error(err.error);
        })
    }
  }

  resetForm(form?:NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeCompetencyId: 0,
      DateFrom: null,
      DateTo: null,
      Competency: null,
      CompetencyId: null,
      Employee: null,
      EmployeeId: this.id
    }
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.EmployeeCompetencyId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    this.close();
  }

  insertRecord(form:NgForm)
  {
    this.service.postEmployeeCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

  updateRecord(form:NgForm)
  {
    this.service.putEmployeeCompetency().subscribe(
      res => {
        this.resetForm(form),
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.id, this.loadItems.bind(this));
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    )
  }

}
