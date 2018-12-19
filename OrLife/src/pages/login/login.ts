import { ResetPage } from './../reset/reset';
import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slide } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  ay = null;
  ipen=null;
  id=null;
  namalengkap=null;
  username=null;
  NIM=null;
  organisasi=null;
  kabinet=null;
  divisi=null;
  jabatan=null;
  email=null;
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
    this.email=null
    this.password=null
    console.log("eehay");
    this.ay = this.apiProvider.getEvents()
    .then(data => {
      this.ipen = data.body;
      for(let i = 0; i < this.ipen.length; i++ ){
        this.ipen[i].showDetails=false;
      }
    });
  }

  next(slide, index) {
    slide.slider.slideTo(index, 2000)
  }

  goToSignUp():void {
    this.navCtrl.push(SignupPage);
  }

  goToReset():void {
    this.navCtrl.push(ResetPage);
  }

  logIn():void {
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
  
  signUp():void {
    this.apiProvider.postSignup(this.id, this.namalengkap, this.NIM, this.organisasi, this.kabinet, this.divisi, this.jabatan, this.email, this.password)
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
