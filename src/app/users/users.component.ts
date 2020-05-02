import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { KendoGridComponent } from '../kendo-grid/kendo-grid.component';
import { NgForm } from '@angular/forms';
import { User } from './shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent extends KendoGridComponent implements OnInit {

  Password2 =null;
  public opened3 = false;
  loggedId = 0;
  constructor(public service : UserService, private toastr: ToastrService) {
    super();
   }

  ngOnInit(): void {
    this.service.refreshList(this.loadItems.bind(this));
    this.loggedId = +localStorage.getItem('id');
    this.resetForm();
  }

  public open3() {
    this.opened3 = true;
  }

  public close3(){
    this.opened3 = false;
    this.resetForm();
  }

  populateForm(pd:User)
  {
    this.service.formData = Object.assign({},pd);
    this.opened2 = true;
  }

  onDelete()
  {
    this.opened = false;
    if(this.idToDelete!=0){
    this.service.deleteRecord(this.idToDelete)
    .subscribe(
      res => {
        this.toastr.success('Įrašas sėkmingai ištrintas');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        this.toastr.error(err.error);
      }
    )
    }
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData = {
      UserId : 0,
      Login : '',
      Password : ''
    }
    this.Password2 = '';
  }

  onSubmit(form:NgForm){
    if(this.checkPasswords()==true)
    {
      if(this.service.formData.UserId ==0)
      this.insert(form);
    else
      this.update(form);
    this.close();
    this.close3();
    }
    else
    {
      this.toastr.error('Slaptažodžiai nesutampa');
    }
  }

  insert(form:NgForm)
  {
    this.service.postRecord().subscribe(
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

  checkPasswords(): boolean{
    if (this.service.formData.Password == this.Password2)
      return true;
    return false;
  }

  update(form:NgForm)
  {
    this.service.putRecord().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Įrašas sėkmingai atnaujintas');
        this.service.refreshList(this.loadItems.bind(this));
      },
      err => {
        console.log(err)
        if(err.status==401)
        {
          this.toastr.error("Neturite teisės keisti kito naudotojo duomenų");
        }
        else
        {
           this.toastr.error(err.error);
        }
       
      }
    )
  }

}
