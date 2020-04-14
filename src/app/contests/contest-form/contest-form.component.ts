import { Component, OnInit } from '@angular/core';
import { ContestService } from '../shared/contest.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contest-form',
  templateUrl: './contest-form.component.html',
  styles: [],
  providers: [DatePipe]
})
export class ContestFormComponent implements OnInit {

  id = null;
  public opened = false;
  constructor(public service: ContestService,
    private toastr: ToastrService, private datePipe: DatePipe,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshContestStatusList();
    this.service.refreshCustomerList();
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

  resetForm(form?: NgForm, )
  {
    this.service.getRecord(this.id);
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ContestId : 0,
      Title : '',
      Budget : 0,
      PublicationDate : null,
      FillingDate : null,
      PriceRobbingDate : null,
      ClaimsFillingDate : null,
      CustomerId : 0,
      ContestStatusId : 0
    }
  }

  onSubmit(form:NgForm){
      if(this.service.formData.ContestId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  delete(ContestId)
  {
      this.service.deleteRecord(ContestId)
      .subscribe(
        res => {
          this.toastr.info('Įrašas sėkmingai ištrintas');
          this.router.navigateByUrl('/contests');
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
        this.router.navigateByUrl('/contest/'+res.ContestId);
        this.id = res.ContestId;
        this.service.formData.ContestId = res.ContestId;
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
