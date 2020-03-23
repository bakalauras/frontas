import { Component, OnInit } from '@angular/core';
import { CompetencyService } from '../shared/competency.service';
import { ToastrService } from 'ngx-toastr';
import { Competency } from '../shared/competency.model';

@Component({
  selector: 'app-competency-list',
  templateUrl: './competency-list.component.html',
  styles: []
})
export class CompetencyListComponent implements OnInit {

  constructor(public service:CompetencyService, private toastr: ToastrService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(pd:Competency){
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(CompetencyId){
    if(confirm('Ar tikrai norite ištrinti?')){
      this.service.deleteCompetency(CompetencyId)
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
