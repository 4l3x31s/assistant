import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import {Pedidos} from "../../class/pedidos";
import {Marcas} from "../../class/marcas";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the RegPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reg-pedidos',
  templateUrl: 'reg-pedidos.html',
})
export class RegPedidosPage {
  formulario: FormGroup;

  public pedidos: Pedidos;
  public marcas: Marcas[] = [];

  public txtMarca: string;
  public txtCodigo: string;
  public txtItem: string;
  public txtCantidad: number;
  public txtPrecio: number;
  public txtPrecioDescuento: number;
  public txtPrecioTotalBs: number;
  public txtNombre: string;
  public txtObservacion: string;
  public txtPago: string;

  public loader: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public taskService: TasksServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public fb: FormBuilder) {
    this.formulario = this.fb.group({
      txtMarca: ['', [Validators.required]],
      txtCodigo: ['', [Validators.required]],
      txtItem: ['', [Validators.required]],
      txtCantidad:['', [Validators.required]],
      txtPrecio:['', [Validators.required]],
      txtPrecioDescuento:['', [Validators.required]],
      txtPrecioTotalBs: ['', [Validators.required]],
      txtNombre: ['', [Validators.required]],
      txtObservacion: ['', [Validators.required]],
      txtPago: ['', [Validators.required]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegPedidosPage');
    this.obtenerMarcas();

  }
  registrarPedidos() {
    this.pedidos = new Pedidos(this.txtMarca,
                               this.txtCodigo,
                               this.txtItem,
                               this.txtCantidad,
                               this.txtPrecio,
                               this.txtPrecioDescuento,
                               this.txtPrecioTotalBs,
                               this.txtNombre,
                               this.txtObservacion,
                               this.txtPago);
    this.taskService.addPedidos(this.pedidos)
      .then(response => {
        //TODO:INSERCION
        console.log(response);
        this.mostrarAlert('Registro de Pedido', 'Se ha registrado correctamente el pedido');

      })
      .catch(error => {
        console.log(error);
        this.mostrarAlert('Error registro', 'No se ha podido registrar el pedido')
      })
  }

  obtenerMarcas(){
    this.presentLoading();
    this.taskService.obtMarcas()
      .then( response => {
        this.marcas = response;
        console.log(JSON.stringify(this.marcas));
        if(this.marcas.length > 0) {
          console.log('Entro a marcas')
        }else{
          this.marcas = [
            new Marcas('ESIKA',1),
            new Marcas('LEBEL',1),
            new Marcas('CYZONE',1),
            new Marcas('TUPPERWARE', 1)
          ];
          for(let i = 0; i < this.marcas.length; i++) {
            this.taskService.addMarcas(this.marcas[i]);
          }


        }
        this.loader.dismissAll();
      })
      .catch( error => {
        console.log(error)
        this.loader.dismissAll();
      })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
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
