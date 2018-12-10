import { HttpClient} from '@angular/common/http';
import { Headers,   RequestOptions  } from '@angular/http';

import { Injectable } from '@angular/core';
import { map,catchError } from "rxjs/operators";


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
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

  postSignup(id, namalengkap, NIM, organisasi, kabinet, divisi, jabatan, email, password){
    var headers = new Headers();
    headers.append("Accept", 'application/js');
    headers.append('Content-Type', 'application/js');
    const requestOptions = new RequestOptions({headers: headers});

    var myData = {
      id: 8,
      name_user: "BERHASILBERHASILBERHASILHORE",
      email_user: "email1",
      password: "password",
      nim_user: "NIM",
      jumlah_point: 0,
      role_id: 1,
      divisi_id: 1,
      kontak_id: 1
    };
    console.log(myData);

    this.http.post("http://localhost:8000/api/user", myData, requestOptions)
      .subscribe(data => {
        console.log("Nyampe sini");
        console.log(myData);
        console.log(data['_body']);
       }, error => {
        console.log(error);
        console.log(data['_body']);
      });
  }

  }
