import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  qrData = null;
  createdCode : null;
  ay = null;
  ipen = null;
  code : null;
  userData = null;
  ipen_selected=null;
  scannedCode = null;
  admin=0;

  constructor(private barcodeScanner: BarcodeScanner, public apiProvider: ApiProvider, public navCtrl: NavController) {
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
      if(data.role_id==2){this.admin=1;}
      else{this.admin=0;}
      console.log("hey", this.userData);
    })
  }

  createCode() {
    this.code=this.ipen_selected.id_event+" "+this.userData.id+" "+this.ipen_selected.date_start;
    console.log(this.code);
    this.createdCode = this.code;
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
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  logOut(): void {
    this.navCtrl.setRoot("LoginPage");
  }

}
