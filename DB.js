var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024); 

db.transaction(function (tx) { 
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (username UNIQUE not null,  password NOT NULL , type ,active )'); 
    tx.executeSql('INSERT INTO USERS VALUES ("toqa","toqa","admin","True")'); 
 })






db.transaction(function (tx) { 
    //tx.executeSql('DELETE FROM Item ');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Item (name unique,  quantity not null, img )'); 
    tx.executeSql('INSERT INTO Item VALUES ("panadol",5,"")');
    tx.executeSql('INSERT INTO Item  VALUES ("glybofen",3,"")');
    tx.executeSql('INSERT INTO Item  VALUES ("octozinc",1,"")');
    
 })




db.transaction(function (tx) { 
    tx.executeSql('CREATE TABLE IF NOT EXISTS invoice (username ,  date , type , item_name ,quantity , FOREIGN KEY (item_name) REFERENCES Item (name) , FOREIGN KEY (username) REFERENCES USERS (username) )');    
    //tx.executeSql('DELETE FROM invoice ');
})                                                         
