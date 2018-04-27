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

  @Output() save = new EventEmitter();

  constructor(private MemoryService: MemoryService){};

  ngOnInit() {
  }

  addHole(form: NgForm){
  	form.reset();
    console.log(form);
  }

  updateSetup(form: NgForm){
	  this.MemoryService.updateSetup(form.value.size, form.value.type);  	
  	this.save.emit();
  }

}
