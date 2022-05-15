import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticate:AuthenticateService, private router:Router) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){
      this.router.navigate(['authorize'])
    }
  }

}
