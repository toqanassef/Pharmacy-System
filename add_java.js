var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024);

/// text1
let addname = document.querySelector("#usern");
addname.addEventListener("input", username);

$("#text1").hide();

function username() {
    let na = this.value ;
    db.transaction(function (tx) { 
        tx.executeSql('SELECT username FROM USERS WHERE username = ?', [na], function (tx, result){
                if(result.rows.length == 1)
                {
                    $("#text1").show();
                    $("#add").prop('disabled', true);
                }
                else
                { 
                    $("#text1").hide();
                    $("#add").prop('disabled', false);

                }
            } , function(){console.log("error");} )
        });     
}

/// add
let add = document.querySelector("#add");
add.addEventListener("click", add_user);

function add_user() {
    let name = $("#usern").val() ;
    let pas =$("#pass").val() ;
    if(name == "")  { alert ("enter user name"); }
    else if(pas == "")  { alert ("enter password"); }
    else 
    {
        db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO USERS VALUES (?,?,"user","False")',[name,pas]); 
            location.reload();
        })
    }
}


//// back
let back = document.querySelector("#back");
back.addEventListener("click",function(){ location.href ="admin.html"; });