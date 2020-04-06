import { Component, OnInit } from '@angular/core';
import { EmployeeExamService } from '../shared/employee-exam.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeExam } from '../shared/employee-exam.model';

@Component({
  selector: 'app-employee-exam-list',
  templateUrl: './employee-exam-list.component.html',
  styles: []
})
export class EmployeeExamListComponent implements OnInit {

  constructor(public service:EmployeeExamService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:EmployeeExam){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(EmployeeExamId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteEmployeeExam(EmployeeExamId)
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
