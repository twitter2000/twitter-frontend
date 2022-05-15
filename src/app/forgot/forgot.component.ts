import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  otpSend=false;
  respon = '';
  reStatus = false;
  username = '';
  status=false;
  type:any;


  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  verifyEmail(values:any){
    const server = environment.server
    this.type=values['type']
    console.log(values)
    const body = {email:values['email']}
    this.http.post<any>(server+'verifyemail/', body).subscribe(user=>{
      this.respon = user.message
      this.reStatus = user.success
      if(this.reStatus===true)
      this.otpSend=true
  })
  }

  forgotUsername(values:any){
    const server = environment.server
    console.log(this.type)
    const body = {type:values['type'],otp:values['otp']}
    this.http.post<any>(server+'forgot/', body).subscribe(user=>{
      if(user.username){
        this.username = user.username
        this.status = true
      }
      else{
        this.status = user.success
        alert(user.message)
      }
    })
}

  forgotPassword(values:any){
    const server = environment.server
    console.log(this.type)
    const body = {type:values['type'],password:values['password'], username:values['username']}
    this.http.post<any>(server+'forgot/', body).subscribe(user=>{
      if(user.password){
        alert(user.password)
        this.router.navigate(['authorize'])
      }
      else{
        this.status = user.success
        alert(user.message)
      }
    })
  }

  cancel(){
    this.router.navigate(['authorize'])
  }
}
