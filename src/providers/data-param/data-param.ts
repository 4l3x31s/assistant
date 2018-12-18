import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataParamProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataParamProvider {
  private datos: any;
  constructor(public http: HttpClient) {
    console.log('Hello DataParamProvider Provider');
  }

  public get() {
    return this.datos;
  }
  public set(datos: any) {
    this.datos = datos;
  }

}
