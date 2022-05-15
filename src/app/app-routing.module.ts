import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { SaveComponent } from './save/save.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'analysis', component:AnalysisComponent},
  {path:'authorize', component:AuthorizationComponent},
  {path:'save', component:SaveComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'', redirectTo:'authorize', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
