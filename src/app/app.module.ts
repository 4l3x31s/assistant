import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite} from "@ionic-native/sqlite";
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';
import {FrmParametrosPage} from "../pages/frm-parametros/frm-parametros";
import {HttpClientModule} from "@angular/common/http";
import { DataParamProvider } from '../providers/data-param/data-param';
import {RegPedidosPage} from "../pages/reg-pedidos/reg-pedidos";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FrmParametrosPage,
    RegPedidosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FrmParametrosPage,
    RegPedidosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    TasksServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataParamProvider,
  ]
})
export class AppModule {}
