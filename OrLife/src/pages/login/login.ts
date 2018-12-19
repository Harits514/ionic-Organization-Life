import { ResetPage } from './../reset/reset';
import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  /*slides = [
    {
      title: "Log In",
    },
    {
      title: "Sign Up",
    },
    {
      title: "Reset",
    }
  ];*/
  @ViewChild(Slides) slides: Slides;
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
    console.log(this.slides);
  }



  next(slide, index) {
    this.slides.slideTo(2, 2000)
  }

  goToSlide2() {
    this.slides.slideTo(2, 500);
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
