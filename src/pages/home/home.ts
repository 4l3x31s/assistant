import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import {Parametros} from "../../class/parametros";
import {Pedidos} from "../../class/pedidos";
import {RegPedidosPage} from "../reg-pedidos/reg-pedidos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parametros: any[] = [];
  public lstPedidos: Pedidos[];
  public pedidos: Pedidos;
  public lstParams: Parametros[];
  constructor(public navCtrl: NavController,
              public taskService: TasksServiceProvider,
              public alertCtrl: AlertController) {
    this.listarProductos();

  }
  ionViewDidLoad(){
    this.obtenerParametros();

  }
  ionViewWillEnter(){
    this.listarProductos();
  }
  listarProductos(){
    this.taskService.obtTodosPedidos()
      .then(listaPedidos => {
        this.lstPedidos = listaPedidos;
        console.log(this.lstPedidos);

        if(!this.lstPedidos && this.lstPedidos.length==0){
          this.mostrarAlert('Error', 'No tenemos datos en la lista');
          this.navCtrl.push(RegPedidosPage, {parametros: this.lstParams});
        }
      })
      .catch(error => {
        this.mostrarAlert('Error', 'No pudimos obtener los pedidos')
      })
  }
  obtenerParametros(){

    this.taskService.allParametros()
      .then(parametros =>{
        this.lstParams = parametros;
        if(this.lstParams.length <= 0) {
          let parametro = {
            parametro: 'TC',
            valor:'6.96'};
          this.taskService.addParametro(parametro)
            .then( response => {
              parametro = {
                parametro: 'DSC',
                valor:'12'};
              this.taskService.addParametro(parametro)
                .then(response => {
                  //TODO: todo correcto
                  this.taskService.allParametros()
                    .then(parametros => {
                      this.lstParams = parametros;
                    })
                    .catch(error => {
                      console.log(error);
                    })
                })
            })
            .catch(error => {
              console.log(error);
            })

        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  irNuevoPedido(){
    this.navCtrl.push(RegPedidosPage, {parametros: this.lstParams});
  }
  mostrarAlert(titulo: string, mensaje: string){
    const alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Aceptar']
    });
    alert.present();
  }



}
