import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { CommonDb } from '../providers/common-db';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TestsqlPage } from '../pages/testsql/testsql';


@Component({
  templateUrl: 'app.html',
  providers: [CommonDb]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public commonDB: CommonDb) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'testsql', component: TestsqlPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      Splashscreen.hide();

      // Initialize SQLite Database
      let db = new SQLite();

      this.commonDB.initializeDB(db);

      /*
      db.openDatabase(
      {
        name: "data.db",
        location: "default"
      }).then(() =>
      {
        db.executeSql("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)", {}).then((data) => 
        {
          console.log("Table created: ", data);
        }, (error) =>
        {
          console.error("Unable to execute sql", error);
        })
      }, (error) =>
      {
        console.error("Unable to open database", error);
      });
      */

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
