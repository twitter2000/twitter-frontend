import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SaveComponent } from './save/save.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Plotly graph module imports
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { ForgotComponent } from './forgot/forgot.component';

PlotlyModule.plotlyjs = PlotlyJS

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    AnalysisComponent,
    SaveComponent,
    HomeComponent,
    NavbarComponent,
    ForgotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    PlotlyModule
  ],
  providers: [ForgotComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
