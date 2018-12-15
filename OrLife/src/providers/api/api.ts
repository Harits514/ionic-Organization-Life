import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Headers,   RequestOptions  } from '@angular/http';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map,catchError } from "rxjs/operators";


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello ApiProvider Provider');
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

  getLogin() {
      return new Promise(resolve => {this.http.get('https://swapi.co/api/people/1')
      .subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getEvents() {
      return new Promise(resolve => {this.http.get('http://localhost:8000/api/events', {
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

  postSignup(id, namalengkap, NIM, organisasi, kabinet, divisi, jabatan, email, password){
    var myData = {
      name_user: namalengkap,
      email_user: email,
      password: password,
      nim_user: NIM,
      jumlah_point: 0,
      role_id: 1,
      divisi_id: 1,
      kontak_id: 1
    };
    return new Promise(resolve => {this.http.post("http://localhost:8000/api/user", myData, {
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
    return new Promise(resolve => {this.http.post("http://localhost:8000/api/login", myData, {
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

}
