import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the EventhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventhistory',
  templateUrl: 'eventhistory.html',
})
export class EventhistoryPage {

  ay = null;
  admin=0;
  ipen=null;
  userData = null;
  id_user=null;
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider){
    this.apiProvider.getData('loginData')
    .then(data => {
      this.userData = data;
      if(data.role_id==1 || data.role_id==2){this.admin=1;}
      else{this.admin=0;}
      this.id_user=data.id;
      this.apiProvider.getEventHistory(this.id_user)
      .then(data => {
        this.ipen = data.body;
        console.log("hey", data);
        for(let i = 0; i < this.ipen.length; i++ ){
          this.ipen[i].showDetails=false;
        }
      });
    });
  }

  toggleDetails(ipen) {
    if (ipen.showDetails) {
        ipen.showDetails = false;
        ipen.icon = 'ios-add-circle-outline';
    } else {
        ipen.showDetails = true;
        ipen.icon = 'ios-remove-circle-outline';
    }
  }

}
