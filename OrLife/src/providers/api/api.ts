import { HttpClient } from '@angular/common/http';
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

}
