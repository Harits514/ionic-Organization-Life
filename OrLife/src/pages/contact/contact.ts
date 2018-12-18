import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  toast_c=null;
  toast_s=null;
  toast_f=null;
  toast_g=null;
  splitted = null;
  ev_id= null;
  ad_id= null;
  status=null;
  qrData = null;
  createdCode : null;
  ay = null;
  ipen = null;
  code : null;
  userData = null;
  ipen_selected=null;
  scannedCode = null;
  admin=0;

  constructor(private barcodeScanner: BarcodeScanner, public apiProvider: ApiProvider, public navCtrl: NavController, public toastCtrl: ToastController) {
    this.ay = this.apiProvider.getEvents()
    .then(data => {
      this.ipen = data.body;
      for(let i = 0; i < this.ipen.length; i++ ){
        this.ipen[i].showDetails=false;
      }
    });

    this.apiProvider.getData('loginData')
    .then(data => {
      this.userData = data;
      if(data.role_id==1 || data.role_id==2){this.admin=1;}
      else{this.admin=0;}
      console.log("hey", this.userData);
    });
  }

  presentToastG(){
    this.toast_g = this.toastCtrl.create({
      message: 'pilih event dulu',
      duration: 3000,
      position: 'top'
    });
    this.toast_g.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    this.toast_g.present();
};

  presentToastC(){
    this.toast_c = this.toastCtrl.create({
      message: 'Created successfully',
      duration: 3000,
      position: 'top'
    });
    this.toast_c.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    this.toast_c.present();
};

presentToastS(){
  this.toast_s = this.toastCtrl.create({
    message: 'Scanned successfully',
    duration: 3000,
    position: 'top'
  });
  this.toast_s.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  this.toast_s.present();
};

presentToastF(){
  this.toast_f = this.toastCtrl.create({
    message: 'Scanning failed',
    duration: 3000,
    position: 'top'
  });
  this.toast_f.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  this.toast_f.present();
};

  createCode() {
    if(this.ipen_selected){
    this.code=this.ipen_selected.id_event+" "+this.userData.id+" "+this.ipen_selected.time_start;
    console.log(this.code);
    this.createdCode = this.code;
    this.presentToastC();
  }
   else{
     this.presentToastG();
   }
    /*this.createdCode = this.apiProvider.getFilms()
    .then(data => {
      this.createdCode = data;
      console.log(this.createdCode.name);
    });
    console.log(this.createdCode.name)*/
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.splitted = this.scannedCode.toString();
      this.splitted = this.splitted.split(" ");
      this.ev_id=this.splitted[0];
      this.ad_id=this.splitted[1];
      this.apiProvider.postJoinEvent(this.userData.id, this.ev_id)
      .then(data => {
        console.log(data.status);

        this.status=data.status;
        
        if(this.status==200){
          this.presentToastS();
        }
        else{
          this.presentToastF();
        }
      });
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  logOut(): void {
    this.navCtrl.setRoot("LoginPage");
  }

}
