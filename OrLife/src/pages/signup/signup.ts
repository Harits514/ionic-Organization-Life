import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  id=null
  namalengkap=null
  username=null
  NIM=null
  organisasi=null
  kabinet=null
  divisi=null
  jabatan=null
  email=null
  password=null

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams) {
    this.id="1"
    this.namalengkap=""
    this.username=""
    this.NIM=""
    this.organisasi=""
    this.kabinet=""
    this.divisi=""
    this.jabatan=""
    this.email=""
    this.password=""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  goToHome():void {
    this.apiProvider.postSignup(this.id, this.namalengkap, this.NIM, this.organisasi, this.kabinet, this.divisi, this.jabatan, this.email, this.password)
    this.navCtrl.push(TabsPage);
    this.navCtrl.setRoot(TabsPage);
  }

}
