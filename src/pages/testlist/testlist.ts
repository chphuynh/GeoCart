import { Component } from '@angular/core';
import { NavController, NavParams , Platform} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { CommonDb } from '../../providers/common-db';

/*
  Generated class for the Testlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-testlist',
  templateUrl: 'testlist.html',
  providers: [CommonDb]
})
export class TestlistPage {
  
  public db: SQLite;
  public lists: Array<Object>;
  public addData: boolean;
  listName: string;

  constructor(public navCtrl: NavController, public commonDB: CommonDb, public navParams: NavParams, public platform: Platform) 
  {
  	this.addData = false;

    this.platform.ready().then(() =>
    {
      this.db = new SQLite();
      this.db.openDatabase(
      {
        name: "data.db",
        location: "default"
      }).then(() =>
      {
        this.refresh();
      }, (error) => 
      {
        console.log("ERROR: ", error);
      });
    });
  }

  public add()
  {
  	this.addData = false;

    if(this.listName)
    {
      var tableData = 
      {
        name: this.listName
      };

      this.commonDB.insertDB(this.db, 'lists', tableData);

      this.refresh();

      this.listName = null;  
    }
  }

  public refresh()
  {
    this.db.executeSql("SELECT * FROM lists", []).then((data) =>
    {
      //console.log(data.rows);
      this.lists = [];
      if(data.rows.length > 0)
      {
        for(var i = 0; i < data.rows.length; i++)
        {
          this.lists.push({name: data.rows.item(i).name});
        }
      }
    }, (error) =>
    {
      console.log("ERROR: ", JSON.stringify(error));
    });
  }

  public eventHandler(keyCode)
  {
    if(keyCode == 13)
    {
      this.add();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TestlistPage');
  }

}
