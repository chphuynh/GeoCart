import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommonDb provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonDb {

  constructor(public http: Http) {
    // console.log('Hello CommonDb Provider');
  }

  initializeDB(db)
  {
  	db.openDatabase(
    {
      name: "data.db",
      location: "default"
    }).then(() =>
    {

      // Creating lists table
      db.executeSql("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", {}).then((data) => 
      {
        console.log("Table created: ", data);
      }, (error) =>
      {
        console.error("Unable to execute sql", error);
       })

      // Create list_detais table
      db.executeSql("CREATE TABLE IF NOT EXISTS list_details (id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, item_name TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", {}).then((data) => 
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
  }

  insertDB(db, tableName, tableData)
  {
  	var columns = Object.keys(tableData).join();
  	var columnData = Object.keys(tableData).map(function(key)
  	{
  		return tableData[key];
  	}).join(); 

  	db.executeSql("INSERT INTO " + tableName + 
  		" (" + columns + ") VALUES	('" + columnData + "')", []).then((data) =>
  	{
  		console.log("Inserted: " + JSON.stringify(data));
  	}, (error) =>
  	{
  		console.log("ERROR: " + JSON.stringify(error.err));
  	});
  }

  clearDB(db, tableName)
  {
  	db.executeSql("DELETE FROM " + tableName, []).then((data) =>
    {
      console.log("Table deleted: ", data);
    }, (error) =>
    {
      console.log("ERROR: ", JSON.stringify(error));
    });
  }

}
