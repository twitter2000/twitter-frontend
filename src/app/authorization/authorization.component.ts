import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { Validators } from '@angular/forms';

import { AuthenticateService } from '../authenticate.service';
import { environment } from 'src/environments/environment';
import { ForgotComponent } from '../forgot/forgot.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  container:any;
  status:any;

  public login !:FormGroup
  public register !:FormGroup

  constructor(private http:HttpClient, private formBuilder:FormBuilder, private router:Router, private authenticate:AuthenticateService,public forgot:ForgotComponent) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){
      this.router.navigate(['authorize'])
    }

    // switch
    this.container = document.querySelector('.container')
    this.status = true;
    // Login 
    this.login = this.formBuilder.group({
      username:['', [Validators.required]],
      password:['',[Validators.required]]
    })
    // Register
    this.register = this.formBuilder.group({
      username:['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required,Validators.minLength(6), Validators.maxLength(10)]]
    })
  }

  // Switching the page from register to login vice-verse
  switchPage(){
    if(this.status === true){
      this.container.classList.remove("sign-up-mode");
      this.status = false
    }
    else{
      this.container.classList.add('sign-up-mode');
      this.status = true
    }
  }

  // Methods for posting the data from login and register to the server for Authentication
  loginUser(){
    const server = environment.server
    this.http.post<any>(server+'authenticate/', this.login.value).subscribe(user=>{
      if (user.success !== false){
        this.authenticate.set("currentUser", JSON.stringify(user))
        this.router.navigate(['home'])
      }
      else if(this.login.valid == false){
        alert("Please check username and password")
      }
      else{
        alert("Incorrect Username or Password!")
        return user;
      }
    })
  }
// Register User 
registerUser(){
  const server = environment.server
  this.http.post<any>(server+'register/', this.register.value).subscribe(res=>{
    if(res.success !== false && this.register.valid){
      alert("Successfully Registered the account")
      this.register.reset();
      this.status = true
      this.switchPage()
    }
    else if(this.register.valid == false){
      alert("Username, Email, Password fields are required...!")
    }
    else{
      alert(res.message)
    }
})
}
}
