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
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider){
    this.ay = this.apiProvider.getEvents()
    .then(data => {
      this.ipen = data.body;
      for(let i = 0; i < this.ipen.length; i++ ){
        this.ipen[i].showDetails=false;
      }
    });
  }
}