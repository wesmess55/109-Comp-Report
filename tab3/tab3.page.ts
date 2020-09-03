import { Component } from '@angular/core';
import { friend } from '../models/friend';
import { DataService } from '../services/data.service';


import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})
export class Tab3Page {

  model = new friend();
  myFriend: friend[] = [];
  share: any;
  data: any;
  
  

  onSave() {
    this.model.friendOf =this.share.userName;
    console.log(this.model);
    //save
    this.data.saveFriend(this.model);
    
    //clear form
    this.model = new friend();
  }
}
