import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlotlyModule } from 'angular-plotly.js';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';


@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})

export class SaveComponent implements OnInit {
  tweet_data:any = '';
  query = '';
  data_comments:any=[];
  data_compounds:any=[];
  pie_data:any={
    'positive':'',
    'negative':'',
    'zero':''
  };
  data_all:any;
  public simplifiedGraph:any;
  public pieGraph:any;
  status=false

  constructor(private authenticate:AuthenticateService, private http:HttpClient, private plotly:PlotlyModule, private router:Router) { }

  ngOnInit(): void {
    if(!this.authenticate.islogin){
      this.router.navigate(['authorize'])
    }
    this.saveAnalysis()
    this.status = false
  }

  saveAnalysis(){
    this.status = false
    const server = environment.server
    const auth = this.authenticate.get('currentUser').data.user

    console.log(auth)
    const body = {'user':auth}
    this.http.get<any>(server+'save/?type=save'+'&user='+auth).subscribe(data=>{
      this.tweet_data = data
      // console.log(data)
    })
  }

  getSaveAnalysis(data:any){
    this.data_all = JSON.parse(JSON.stringify(data))
    console.log(this.data_all)
    this.status = true
    for(let i of this.data_all['saved_data']){
      
      this.data_comments.push(i['comment'])
      this.data_compounds.push(i['compound'])
    }
    console.log(this.data_comments, this.data_compounds)
    this.simplifiedGraph = {
      data:[
        {
          x:this.data_comments, y:this.data_compounds,type:'scatter', mode:'markers+lines', marker:{color:'red'}
        }
      ],
      layout:{
        title:{
          text:this.data_all['saved_query'].toUpperCase(),
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
        
        width: 500,
        height: 500,
        
      },
   
    }
    this.status = true
  }

  getSaveList(){
    this.status = false
  this.query = '';
  this.data_comments=[];
  this.data_compounds=[];
  this.pie_data={
    'positive':'',
    'negative':'',
    'zero':''
  };
  this.data_all = {}
  this.simplifiedGraph ={};
  this.pieGraph ={}
  }

  savedDelete(id:any){
    const server = environment.server
    const auth = this.authenticate.get('currentUser')
    const body = {id:id,'user':auth}
    this.http.post<any>(server+'save/?type=delete',body).subscribe(data=>{
      if(data.success == true){
        alert(data.message)
        this.saveAnalysis()
      }
    })
  }
}
