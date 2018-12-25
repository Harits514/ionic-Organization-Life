import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Toast, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) slides: Slides;
  ay = null;
  org=null;
  id=null;
  namalengkap=null;
  username=null;
  NIM=null;
  kabinet=null;
  divisi=null;
  jabatan=null;
  email=null;
  password=null;
  org_selected=null;
  kabinet_selected=null;
  divisi_selected=null;

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams, public toastCtrl: ToastController) {
    this.id="1"
    this.namalengkap=""
    this.username=""
    this.NIM=""
    this.jabatan=""
    this.email=null
    this.password=null
    console.log(this.slides);

    this.apiProvider.getData('loginData')
    .then(data => {
      if(data){
        console.log(data);
        this.navCtrl.push(TabsPage);
        this.navCtrl.setRoot(TabsPage);
      }
    });

    this.apiProvider.getOrganizations()
    .then(data => {
      this.org = data.body;
      for(let i = 0; i < this.org.length; i++ ){
        this.org[i].showDetails=false;
      }
    });

    this.apiProvider.getKabinet(1)
    .then(data => {
      this.kabinet = data.body;
    });

    this.apiProvider.getDivisi(1)
    .then(data => {
      this.divisi = data.body;
    });

  }


  goToSlide0() {
    this.slides.slideTo(0, 500);
  }

  goToSlide1() {
    this.slides.slideTo(1, 500);
  }

  goToSlide2() {
    this.slides.slideTo(2, 500);
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
    this.apiProvider.postSignup(this.id, this.namalengkap, this.NIM, this.org_selected.id_organization , this.kabinet_selected.id_cabinet, this.divisi.id_division, this.jabatan, this.email, this.password)
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Email konfirmasi telah dikirim!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
