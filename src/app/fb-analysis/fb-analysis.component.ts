import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { AuthorizationComponent } from '../authorization/authorization.component';

@Component({
  selector: 'app-fb-analysis',
  templateUrl: './fb-analysis.component.html',
  styleUrls: ['./fb-analysis.component.css']
})
export class FbAnalysisComponent implements OnInit {

  constructor(private authenticate:AuthenticateService, private router:Router) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){

      this.router.navigate(['authorize'])
    }
  }

}
