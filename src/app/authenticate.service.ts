import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  public authenticate:any
  public user:any
  public islogin = false;

  constructor(private router :Router) { }

  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
    this.islogin = true
}

get(key: string) {
  console.log(key)
  const auth = JSON.parse(sessionStorage.getItem(key) || '{}')
  console.log(auth)
    return auth;
}

remove(key: string) {
  this.islogin = false
  sessionStorage.removeItem(key);
}

isLogged(){
  if(this.get('currentUser') == null){
    this.authenticate = true;
    this.user = this.get('currentUser')
    
    return this.authenticate
  }
  else{
    return false
  }
}

logout(){
  console.log('logout')
  sessionStorage.removeItem('currentUser')
}
}
