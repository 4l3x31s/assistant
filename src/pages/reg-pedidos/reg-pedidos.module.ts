import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegPedidosPage } from './reg-pedidos';

@NgModule({
  declarations: [
    RegPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(RegPedidosPage),
  ],
})
export class RegPedidosPageModule {}
