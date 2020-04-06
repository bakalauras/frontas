import { Component, OnInit } from '@angular/core';
import { EmployeeDutyService } from '../shared/employee-duty.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDuty } from '../shared/employee-duty.model';

@Component({
  selector: 'app-employee-duty-list',
  templateUrl: './employee-duty-list.component.html',
  styles: []
})
export class EmployeeDutyListComponent implements OnInit {

  constructor(public service:EmployeeDutyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:EmployeeDuty){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(EmployeeDutyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteEmployeeDuty(EmployeeDutyId)
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
