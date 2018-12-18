import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {SQLite} from "@ionic-native/sqlite";
import {FrmParametrosPage} from "../pages/frm-parametros/frm-parametros";
import {TasksServiceProvider} from "../providers/tasks-service/tasks-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlite: SQLite,
    public taskService: TasksServiceProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Ajustes', component: FrmParametrosPage}
    ];

  }
  private createDataBase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
      this.taskService.setDatabase(db);
        console.log(db);
        this.taskService.createTables();
      })
      .catch( error => {
        console.log(error);
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#38006b');
      this.splashScreen.hide();
      this.createDataBase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
