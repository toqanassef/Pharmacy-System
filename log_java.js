var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024);



let login = document.querySelector("#log");
login.addEventListener("click", log_in);

function log_in (){
    let name = $("#username").val() ;
    let pass =$("#pass").val() ;
    db.transaction(function (tx) { 
        tx.executeSql('SELECT username FROM USERS WHERE username = ?', [name], function (tx, result){
                if(result.rows.length == 1)
                {
                    tx.executeSql('SELECT password FROM USERS WHERE username = ?', [name], function (tx, result){
                        if(result.rows[0].password == pass)
                        {
                            tx.executeSql('UPDATE USERS SET active = "True" WHERE username = ?', [name] );
                            gotopage(name);
                        }
                        else
                        { 
                           alert("password error");
        
                        }
                    } , function(){console.log("error");} )
                }
                else  
                { 
                   alert("user name not exist");

                }
            } , function(){console.log("error");} )
        });     
}

function gotopage(name) {
    db.transaction(function (tx) { 
        tx.executeSql('SELECT type FROM USERS WHERE username = ?', [name], function (tx, result){
            let t =result.rows[0].type;
            if (t == "admin")  { location.href ="admin.html";  }
            else {  location.href ="user.html";  }           
        } , null )
    });
    
}