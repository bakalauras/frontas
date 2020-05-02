import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public service : JwtService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form != null)
      form.resetForm();
      this.service.formData = {
        UserId: 0,
        Login : '',
        Password : ''
      }
  }

  onSubmit(form:NgForm){
    this.service.postAuth().subscribe(
      res => {
       // this.toastr.success('Prisijungta');
        window.location.href = 'projects';
      },
      err => {
        //console.log(err)
        this.toastr.error('Blogas prisijungimo vardas arba slaptažodis');
      }
    )
  }

}
