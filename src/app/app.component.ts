import { Component, OnInit } from '@angular/core';
import { MemoryService } from './memory.service'

@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    MemoryService
  ]
})
export class AppComponent implements OnInit {
  title = 'app';
  setupView = true;
  constructor(private MemoryService: MemoryService){};
  ngOnInit(){
    let input = [
      {location:1500,size:200},
      {location:0,size:200},
      {location:1000,size:300},
      {location:300,size:50}
    ]    
    console.log(this.MemoryService.generate_holes(input, 1700));
    console.log(this.MemoryService.generate_holes(input, 1900));
    
  }
}
