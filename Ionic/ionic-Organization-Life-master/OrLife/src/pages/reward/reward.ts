import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {

  userData=null;
  admin=null;
  rewards=null;

  constructor(public apiProvider: ApiProvider, public navCtrl: NavController, public toastCtrl: ToastController) {
    this.apiProvider.getRewards()
    .then(data => {
      this.rewards = data.body;
      for(let i = 0; i < this.rewards.length; i++ ){
        this.rewards[i].showDetails=false;
      }
      console.log("ada?", this.rewards)
    });

    this.apiProvider.getData('loginData')
    .then(data => {
      this.userData = data;
      /*cek admin bukan*/
      if(this.userData.role_id==1 || this.userData.role_id==2){this.admin=1;}
      else{this.admin=0;}
    })
}

tukarReward(ipen) {
  if (ipen.points_reward>this.userData.jumlah_point) {
    let toast = this.toastCtrl.create({
      message: 'Maaf poin anda belum mencukupi.',
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  } else {
    this.apiProvider.postReward(this.userData.id, ipen.id_reward)
    .then(() => {
      this.apiProvider.getLogin(this.userData.id)
      .then(data => {
        this.apiProvider.storage.set("loginData", data.body)
        .then(()=>{
          window.location.reload();
          let toast = this.toastCtrl.create({
            message: 'Permintaan anda akan diproses, terimakasih.',
            duration: 3000,
            position: 'top'
        })
        toast.present();
      })
      });

      /*
      this.apiProvider.getLogin(this.userData.id)
      .then(dataL => {
        console.log("hasil get login", dataL);

        this.apiProvider.storage.set("loginData", dataL.body)
        .then(dataS => {
          console.log("hasil simpan data", dataS);
          this.apiProvider.getData('loginData')
          .then(dataG => {
            console.log("hasil get data", dataG);
            this.userData = dataG;
            if(dataG.role_id==1 || dataG.role_id==2){this.admin=1;}
            else{this.admin=0;}
          });

          let toast = this.toastCtrl.create({
            message: 'Permintaan anda akan diproses, terimakasih.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      });*/

    });
  }
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
