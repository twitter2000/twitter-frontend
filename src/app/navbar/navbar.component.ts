import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authenticate:AuthenticateService, private router:Router) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){
      this.router.navigate(['authorize'])
    }
  }

logout(){
  this.authenticate.remove('currentUser')
  this.router.navigate(['authorize'])
}
}
