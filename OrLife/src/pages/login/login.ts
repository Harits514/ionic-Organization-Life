import { ResetPage } from './../reset/reset';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  ay = null;
  ipen=null;
  id=null
  email=null
  password=null
  status=null

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams) {
    this.email=""
    this.password=""
    console.log("eehay");
    this.ay = this.apiProvider.getEvents()
    .then(data => {
      this.ipen = data.body;
      for(let i = 0; i < this.ipen.length; i++ ){
        this.ipen[i].showDetails=false;
      }
    });
  }

  goToSignUp():void {
    this.navCtrl.push(SignupPage);
  }

  goToReset():void {
    this.navCtrl.push(ResetPage);
  }

  goToHome():void {
    this.apiProvider.postLogin(this.email, this.password)
    .then(data => {
      console.log(data.status);
      this.status=data.status;
      this.apiProvider.storage.set("loginData", data.body)
      .then(() => {
        this.navCtrl.push(TabsPage);
        this.navCtrl.setRoot(TabsPage);
      });
    });
  }

}
