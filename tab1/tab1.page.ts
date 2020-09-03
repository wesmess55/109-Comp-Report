import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { firestore } from 'firebase';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  postToDisplay= [];

  constructor(private data:DataService, private shared: SharedService) {
    
    this.data.getAllPosts().subscribe(list => {

     
      list = list.filter(p => p.from === this.shared.userName 
        || p.to === "Everyone" 
        || p.to === this.shared.userName);

      this.postToDisplay = list.map(p => {
        let wrongFormat: any = p.timeStamp;
        p.timeStamp = new firestore.Timestamp(wrongFormat.seconds, wrongFormat.nanoseconds).toDate();
        return p;
        });

        
        this.postToDisplay = this.postToDisplay.sort((a, b) =>{
          if(a.timeStamp > b.timestamp){
            return -1;  
          }
          else {
            return 1; 
          }
        });


           console.log(this.postToDisplay);
    });
  }

}