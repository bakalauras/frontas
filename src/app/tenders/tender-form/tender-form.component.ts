import { Component, OnInit } from '@angular/core';
import { TenderService } from '../shared/tender.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tender-form',
  templateUrl: './tender-form.component.html',
  styles: []
})
export class TenderFormComponent implements OnInit {

  id = null;
  public opened = false;
  constructor(public service: TenderService,
    private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshContestsList();
    this.service.refreshTenderStateList();
    this.resetForm();
  }

  public close(status) {
    if(status =='yes')
    {
      this.delete(this.id)
    }
    this.opened = false;
  }

  public open() {
    this.opened = true;
  }

  resetForm(form?: NgForm)
  {
    this.service.getRecord(this.id);
    if(form != null)
      form.resetForm();
    this.service.formData = {
      TenderId : 0,
      TenderStateId : null,
      TenderState : null,
      Price : 0,
      FillingDate : null,
      ContestId : null,
      Contest : null
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.TenderId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  delete(TenderId)
  {
      this.service.deleteRecord(TenderId)
      .subscribe(
        res => {
          this.toastr.success('Įrašas sėkmingai ištrintas');
          this.router.navigateByUrl('/tenders');
        },
        err => {
          console.log(err)
          this.toastr.error(err.error);
        }
      )
    }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai pridėtas');
        this.router.navigateByUrl('/tender/'+res.TenderId);
        this.id = res.TenderId;
        this.service.formData.TenderId = res.TenderId;
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
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
  }

}
