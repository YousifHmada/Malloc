import { Injectable } from '@angular/core';

@Injectable()
export class MemoryService {

  size;
  type;
  processes = [];
  holesListPoints = [];
  holes = [];
  processesListPoints = [];

  constructor() { }

  updateSetup(size, type){
    this.size = size;
    this.type = type;
    this.processes = this.generateProcesses(this.holes, size)
    this.processesListPoints = this.getLocationPoints(this.processes);
    console.log(size, type);
    console.log("holes", this.holes);
    console.log("processes", this.processes);
    console.log("processesListPoints", this.processesListPoints);
  };

  memorySizeChanged(size){
    this.size = size;
    while(this.holes.length != 0 &&(this.holes[this.holes.length - 1].location + this.holes[this.holes.length - 1].size) > size){
      if(this.holes[this.holes.length - 1].location > size){
        this.holes = this.holes.slice(0, this.holes.length - 1);
      }else{
        let temp = size - this.holes[this.holes.length - 1].location;
        if(temp === 0){
          this.holes = this.holes.slice(0, this.holes.length - 1);
        }else{
          this.holes[this.holes.length - 1].size = temp;
        }
      }
    }
    this.holesListPoints = this.getLocationPoints(this.holes);
    console.log("holes", this.holes);
    console.log("locationPoints", this.holesListPoints);
  }

  getLocationPoints(mainInput){
    let input = [];
    if(mainInput.length !== 0){
      mainInput.forEach((e)=>{
        input.push(e.location);
        input.push(e.location + e.size);
      });
    }
    input.push(0);
    input.push(this.size);
    let output = [];
    input.forEach((e)=>{
      if(output.indexOf(e) === -1){
        output.push(e);
      }
    });
    output = output.sort((prev, cur)=>prev > cur); 
    return output;
  }

  generateProcesses(input, size) {
    if(input.length == 0)return [{location: 0, type:0, size: size}];
     input = input.sort(( prev, cur)=>{
       return prev.location > cur.location;
     });
     var output = [];
     var index = 0;
     if (input[0].location == 0) {
       index = input[0].size;
       input = input.slice(1);
     }
     input.forEach((cur)=>{
       output.push({location: index, type:0, size: cur.location - index});
       index = cur.location + cur.size;
     });
     if(index != size)output.push({location: index, type:0, size: size - index});
     return output
   }

  addHole(location, size) {
    this.holes.push({location, size});
    this.holes = this.holes.sort((prev,cur)=>prev.location > cur.location);
    this.holes = this.holes.reduce((aggr, cur)=>{
      if(aggr.length == 0)aggr.push(cur);
      else{
        let temp = aggr[aggr.length - 1];
        if(temp.location + temp.size >= cur.location){
          temp.size += (cur.size - (temp.location + temp.size - cur.location));
        }else{
          aggr.push(cur);
        }
      }
      return aggr;
    },[]);
    this.memorySizeChanged(this.size);
  }

  best_fit (input, size){
    //return location
      input = input.sort((prev, cur)=>{
        return (prev.size == cur.size) ? (prev.location > cur.location) : (prev.size > cur.size);
      });
      for (var i = 0; i < input.length; i++) {
        if (size <= input[i].size) {
          return input[i].location;
        }
      }
   }
   
 first_fit(input, size){
   input = input.sort(( prev, cur)=>{
     return prev.location > cur.location;
 
   });
   for (var i = 0; i < input.length; i++) {
      if (size <= input[i].size) {
        return input[i].location;
      }
    }
 }
   
   generate_holes(input, size) {
     if(input.length == 0)return [{location: 0, size: size}];
     input = input.sort(( prev, cur)=>{
       return prev.location > cur.location;
   
     });
     var output = [];
     var index = 0;
     if (input[0].location == 0) {
       index = input[0].size;
       input = input.slice(1);
     }
     input.forEach((cur)=>{
       output.push({location: index, size: cur.location - index});
       index = cur.location + cur.size;
     });
     if(index != size)output.push({location: index, size: size - index});
     return output
   }

   add_process(pName, pSize) {
    let input = this.generate_holes(this.processes, this.size);
    let location;
    if(this.type == 'best-fit'){
      location = this.best_fit(input, pSize);
      if(location !== undefined){
        this.processes.push({location, type:1, name: pName, size: pSize});
      }
    }else{
      location = this.first_fit(input, pSize);
      if(location !== undefined){
        this.processes.push({location, type:1, name: pName, size: pSize});
      }
    }
    this.processesListPoints = this.getLocationPoints(this.processes);
    console.log("processes", this.processes);
    console.log("processesListPoints", this.processesListPoints);
   }
}
