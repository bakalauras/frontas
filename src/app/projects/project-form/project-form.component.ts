import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styles: []
})
export class ProjectFormComponent implements OnInit {

  id = null;
  public opened = false;
  constructor(public service: ProjectService,
    private toastr: ToastrService,
    private router: Router,
    public route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id'); //get id parameter
    }

  ngOnInit() {
    this.service.refreshTenderList();
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

  resetForm(form?: NgForm)
  {
    this.service.getRecord(this.id);
    if(form != null)
      form.resetForm();
    this.service.formData = {
      ProjectId : 0,
      Title : '',
      ContractNumber : '',
      Budget : 0,
      CustomerId : 0,
      TenderId : 0
    }
  }

  onSubmit(form:NgForm){
    if(this.service.formData.ProjectId ==0)
      this.insert(form);
    else
      this.update(form);
  }

  delete(ProjectId)
  {
      this.service.deleteRecord(ProjectId)
      .subscribe(
        res => {
          this.toastr.info('Įrašas sėkmingai ištrintas');
          this.router.navigateByUrl('/projects');
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
        this.router.navigateByUrl('/project/'+res.ProjectId);
        this.id = res.ProjectId;
        this.service.formData.ProjectId = res.ProjectId;
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
