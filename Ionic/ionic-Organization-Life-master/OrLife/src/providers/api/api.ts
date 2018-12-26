import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Headers,   RequestOptions  } from '@angular/http';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map,catchError } from "rxjs/operators";
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  link="";

  constructor(public http: HttpClient, public storage: Storage, public toastCtrl: ToastController) {
    console.log('Hello ApiProvider Provider');
    this.link="http://localhost:8000";
    /*http://192.168.43.169:8000*/
  }

  getFilms() {
      return new Promise(resolve => {this.http.get('https://swapi.co/api/people/1')
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getLogin(id) {
      return new Promise(resolve => {this.http.get(this.link+'/api/user/'+id,{
          observe: 'response'
      })
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEvents() {
      return new Promise(resolve => {this.http.get(this.link+'/api/events', {
      observe: 'response'
   })
      .subscribe(data => {
        console.log("events",data.status);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getRewards() {
    return new Promise(resolve => {this.http.get(this.link+'/api/reward', {
    observe: 'response'
 })
    .subscribe(data => {
      console.log("rewards",data.status);
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getOrganizations() {
  return new Promise(resolve => {this.http.get(this.link+'/api/organizations', {
  observe: 'response'
})
  .subscribe(data => {
    console.log("organizations",data.status);
    resolve(data);
  }, err => {
    console.log(err);
  });
});
}

getKabinet(id_organisasi) {
  console.log(this.link+'/api/getKabinet/'+id_organisasi);
    return new Promise(resolve => {this.http.get(this.link+'/api/cabinets/', {
      observe: 'response'
   })
   .subscribe(data => {
     console.log("kabinet",data.status);
     resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

getDivisi(id_kabinet) {
  console.log(this.link+'/api/divisions/');
    return new Promise(resolve => {this.http.get(this.link+'/api/divisions/', {
      observe: 'response'
   })
   .subscribe(data => {
     console.log("divisi",data.status);
     resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

  getEventHistory(id_user) {
    console.log(this.link+'/api/userEventHistory/'+id_user);
      return new Promise(resolve => {this.http.get(this.link+'/api/userEventHistory/'+id_user, {
        observe: 'response'
     })
     .subscribe(data => {
       console.log(data.status);
       resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  postReward(id_user, id_reward){
    var myData = {
      id_user: id_user,
      id_reward: id_reward
    };
    return new Promise(resolve => {this.http.post(this.link+"/api/reedemReward", myData, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
      .subscribe(data => {
        console.log(data.body);
        resolve(data);
       }, error => {
        let toast = this.toastCtrl.create({
          message: 'Transaksi gagal.',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      });
    });
  }

  postSignup(id, namalengkap, NIM, organisasi, kabinet, divisi, jabatan, email, password){
    var myData = {
      name_user: namalengkap,
      email_user: email,
      password: password,
      nim_user: NIM,
      jumlah_point: 0,
      role_id: 4,
      divisi_id: 1,
      kontak_id: 1
    };
    return new Promise(resolve => {this.http.post(this.link+"/api/user", myData, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
      .subscribe(data => {
        console.log(data);
        resolve(data);
       }, error => {
        console.log(error);
      });
    });
  }

  postLogin(email, password){
    var myData = {
      email: email,
      password: password
    };

    return new Promise(resolve => {this.http.post(this.link+"/api/login", myData, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
      .subscribe(data => {
        console.log(data.body);
        resolve(data);
       }, error => {
        let toast = this.toastCtrl.create({
          message: 'Email atau password salah.',
          duration: 3000,
          position: 'top'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      });
    });
  }

  postJoinEvent(id_user, id_event){
    var myData = {
      id_user: id_user,
      id_event: id_event
    };
    return new Promise(resolve => {this.http.post(this.link+"/api/joinEvent", myData, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
      .subscribe(data => {
        console.log(data.body);
        resolve(data);
       }, error => {
        console.log(error);
      });
    });
  }

  getData(key){
    return this.storage.get(key);
  }

  removeData(key){
    return this.storage.remove(key);
  }

}
