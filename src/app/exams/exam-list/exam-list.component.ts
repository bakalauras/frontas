import { Component, OnInit } from '@angular/core';
import { ExamService } from '../shared/exam.service';
import { ToastrService } from 'ngx-toastr';
import { Exam } from '../shared/exam.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styles: []
})
export class ExamListComponent implements OnInit {

  constructor(public service:ExamService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:Exam){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(ExamId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteExam(ExamId)
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
