import { Component, OnInit } from '@angular/core';
import { EmployeeCompetencyService } from '../shared/employee-competency.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCompetency } from '../shared/employee-competency.model';

@Component({
  selector: 'app-employee-competency-list',
  templateUrl: './employee-competency-list.component.html',
  styles: []
})
export class EmployeeCompetencyListComponent implements OnInit {

  constructor(public service:EmployeeCompetencyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:EmployeeCompetency){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(EmployeeCompetencyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteEmployeeCompetency(EmployeeCompetencyId)
      .subscribe(res =>{
        this.service.refreshList();
        this.toastr.success('Ištrinta sėkmingai');
      },
        err => {
          console.log(err);
          this.toastr.error('Įvyko klaida');
        })
    }
  }

}
