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
  createdCode : Observable<any>;
  ay = null;
  cobs : Observable<any>;
  scannedCode = null;
 
  constructor(private barcodeScanner: BarcodeScanner, public apiProvider: ApiProvider, navCtrl: NavController) { 
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
