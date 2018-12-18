import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import {Parametros} from "../../class/parametros";

/**
 * Generated class for the FrmParametrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frm-parametros',
  templateUrl: 'frm-parametros.html',
})
export class FrmParametrosPage {

  public txtParam: string;
  public txtValor: string;
  public lstParams: Parametros[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public taskService: TasksServiceProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrmParametrosPage');
  }
  obtenerParametros(){

    this.taskService.allParametros()
      .then(parametros =>{
        this.lstParams = parametros;
        if(this.lstParams.length <= 0) {
          this.mostrarAlert('No encontramos datos');

        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  mostrarAlert(mensaje: string){
    let alert = this.alertCtrl.create({
      title: 'Oh ,oh :(',
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }



}
