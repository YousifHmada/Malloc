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
  processes;

  constructor(private MemoryService: MemoryService){};

  ngOnInit() {
    this.processes = this.MemoryService.processes;
  }

  addProcess(form: NgForm){
    this.MemoryService.add_process(form.value.name, +form.value.size);
    form.reset();
  }

}
