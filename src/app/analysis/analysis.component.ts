import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  
  query = '';
  data_comments:any=[];
  data_compounds:any=[];
  pie_data:any={
    'positive':'',
    'negative':'',
    'zero':''
  };
  data_all:any;
  stats:any;
  public simplifiedGraph:any;
  public pieGraph:any;
  public saved=false;

  constructor(private http:HttpClient,private router:Router, private authenticate:AuthenticateService) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){

      this.router.navigate(['authorize'])
    }
  }
  getStats(query:any){
    const server = environment.server
    const body = {query:query, user:this.authenticate.get('currentUser')}
    this.http.post<any>(server+'analysis/?type=analysis', body).subscribe(
      (data)=>{
        if(data.success == true){
          this.data_all = data
          this.stats = data.stats
          let y = 0
          for(let i of data.data){
            this.data_comments.push(i['comment'])
            y+=1
            this.data_compounds.push(i['compound'])
          }
          this.pie_data['negative'] = this.data_compounds.filter((x:any) => x < 0 ).length
          this.pie_data['positive'] = this.data_compounds.filter((x:any) => x > 0).length
          this.pie_data['zero'] = this.data_compounds.filter((x:any) => x == 0).length
          this.simplifiedGraph = {
            data:[
              {x:this.stats['tweets'], y:this.data_compounds, mode:'markers+lines', marker:{color:'red'}}
            ],
            layout:{
              title:{
                text:query.toUpperCase(),
                font:{
                  family:'courier New, monospace',
                  size:24,
                  letter_spacing:4,
                },
                xref:'paper',
                x:0.05,
              },
              autosize: false,
              width:1400,
              height:700,
              margin: {
                l: 50,
                r: 50,
                b: 300,
                t: 100,
                pad: 4
              },
            }
          }
          this.pieGraph = {
            data:[
              {
                values:[this.pie_data['positive'],this.pie_data['zero'], this.pie_data['negative']],
                labels:['Positive', 'Neutral', 'Negative'],
                type:'pie',
                marker:{
                  colors:['green', 'orange', 'red']
                }
              },
            ],
            layout:{
              title:{
                text:query.toUpperCase(),
                font:{
                  family:'courier New, monospace',
                  size:24,
                  letter_spacing:4,
                },
                xref:'paper',
                x:0.05,
              },
              autosize: false,
              width:500,
              height:500,
              margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
              },
            }
          }
        }
      else{
        alert(data.message)
      }
    }
    )
  }

// save analysis to the database
  saveAnalysis(data_all:any,stats:any, query:any, saveDescription:any){
    const server = environment.server
    const body = {query:query.value,data:data_all,stats:stats,description:saveDescription, user:this.authenticate.get('currentUser')}
    this.http.post<any>(server+'save/?type=save-item', body).subscribe(data=>{
      if(data.success==true){
        this.saved = true
        alert('The analysis is successfully saved!')
      }
    })
    
  }

  reset(){
  this.query = '';
  this.data_comments=[];
  this.data_compounds=[];
  this.pie_data={
    'positive':'',
    'negative':'',
    'zero':''
  };
  this.data_all=null;
  this.stats=null;
  this.simplifiedGraph={};
  this.pieGraph={};
  this.saved=false;
  }

  // Navigation for internal web page
  scroll(graph:any){
    let element = document.getElementById(graph);
    if(element){
      element.scrollIntoView()
    }
  }
}
