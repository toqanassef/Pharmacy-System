
var n;
let name = document.getElementById("name");
var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024);
db.transaction(function (tx) { 
    tx.executeSql('SELECT username FROM USERS WHERE active = "True"', [], function (tx, result){
        n=result.rows[0].username;
        name.innerHTML = "Hi "+n;  
    } , null )
});

//name.innerHTML = "Hi "+n;

let but1 = document.querySelector("#sign");
//console.log(but1);
but1.addEventListener("click",sign_fun);

function sign_fun() {
    db.transaction(function (tx) { 
        tx.executeSql('UPDATE USERS SET active = "False" '); 
        location.href ="login.html";
    } )
    
}



