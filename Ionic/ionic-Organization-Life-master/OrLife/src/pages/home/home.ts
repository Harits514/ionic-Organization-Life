import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


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

  constructor(public apiProvider: ApiProvider, public navCtrl: NavController) {
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
      if(this.userData.role_id==1 || this.userData.role_id==2){this.admin=1;}
      else{this.admin=0;}
      console.log("admin?", this.admin)
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
}
