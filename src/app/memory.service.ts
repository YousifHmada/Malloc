import { Injectable } from '@angular/core';

@Injectable()
export class MemoryService {

  constructor() { }

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
     if(input.length == 0)return;
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

}
