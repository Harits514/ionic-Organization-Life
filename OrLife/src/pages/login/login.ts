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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignUp():void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  goToHome():void {
    this.navCtrl.push(TabsPage);
    this.navCtrl.setRoot(TabsPage);
  }

}
