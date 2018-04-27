import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MemoryService } from '../memory.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() back = new EventEmitter();

  constructor(private MemoryService: MemoryService){};

  ngOnInit() {
  }

  addProcess(form: NgForm){
  	form.reset();
    console.log(form);
  }

}
