import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MemoryService } from '../memory.service'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  selectedValue = "first-fit";
  memorySize;

  @Output() save = new EventEmitter();

  constructor(private MemoryService: MemoryService){};

  ngOnInit() {
    this.memorySize = this.MemoryService.size;
  }

  addHole(form: NgForm){
  	this.MemoryService.addHole(+form.value.start, +form.value.size);
    form.reset();
  }

  updateSetup(form: NgForm){
	  this.MemoryService.updateSetup(+form.value.size, form.value.type);  	
  	this.save.emit();
  }

  memorySizeChanged(){
    console.log("changed");
    this.MemoryService.memorySizeChanged(+this.memorySize);
  } 
}
