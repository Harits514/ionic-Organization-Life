import { EventhistoryPage } from './../eventhistory/eventhistory';
import { LoginPage } from './../login/login';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  admin=0;
  cobs : null;
  scannedCode = null;
  ipen=null;
  userData=null;

  constructor(public navParams: NavParams, public apiProvider: ApiProvider, public navCtrl: NavController) {
    this.apiProvider.getData('loginData')
    .then(data => {
      this.userData = data;
      /*cek admin bukan*/
      if(this.userData.role_id==2){this.admin=1;}
      else{this.admin=0;}
    })
  }

  goToEventHistoryPage():void {
    this.navCtrl.push(EventhistoryPage);
  }

  LogOut():void{
    this.apiProvider.removeData('loginData')
    .then(() => {
      this.navCtrl.push(LoginPage);
       window.location.reload();
    })
  }
}
