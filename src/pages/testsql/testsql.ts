import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite } from "ionic-native";
import { CommonDb } from "../../providers/common-db";

/*
  Generated class for the Testsql page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-testsql',
  templateUrl: 'testsql.html',
  providers: [CommonDb]
})
export class TestsqlPage {
  
  public db: SQLite;
  public lists: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public commonDB: CommonDb) 
  {
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
    var tableData = 
    {
      name: "DIY Projects"
    };

    this.commonDB.insertDB(this.db, 'lists', tableData);

    this.refresh();

    /*
  	this.db.executeSql("INSERT INTO lists (name) VALUES	('Groceries')", []).then((data) =>
  	{
  		console.log("Inserted: " + JSON.stringify(data));
  	}, (error) =>
  	{
  		console.log("ERROR: " + JSON.stringify(error.err));
  	});
    */
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

  public clear()
  {
    this.commonDB.clearDB(this.db, 'lists');
    this.refresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestsqlPage');
  }

}
