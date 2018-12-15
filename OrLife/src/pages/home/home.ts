import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  qrData = null;
  createdCode : null;
  ay = null;
  admin=0;
  cobs : null;
  scannedCode = null;
  ipen=null;
  userData=null;
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

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
      /*cek admin bukan*/
      if(this.userData.role_id==2){this.admin=1;}
      else{this.admin=0;}
    })

}

  toggleDetails(ipen) {
    if (ipen.showDetails) {
        ipen.showDetails = false;
        ipen.icon = 'ios-add-circle-outline';
    } else {
        ipen.showDetails = true;
        ipen.icon = 'ios-remove-circle-outline';
    }
  }

  createCode() {
    this.createdCode = this.apiProvider.getFilms()
    .then(data => {
      this.createdCode = data;
      console.log(this.createdCode.name);
    });
    console.log(this.createdCode.name)
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
