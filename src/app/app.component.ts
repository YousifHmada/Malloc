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
  setupView = true;
  cancelSetupView(){
    this.setupView = false;
  };
  openSetupView(){
    this.setupView = true;
  };
  constructor(private MemoryService: MemoryService){};
  ngOnInit(){
  }
}
