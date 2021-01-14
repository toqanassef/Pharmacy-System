var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024);

/// image

let addimg = document.querySelector("#dname");
addimg.addEventListener("change", add_image);

var img = document.querySelector("#addimg");

function add_image() {
    db.transaction(function (tx) { 
        let nn = $("#dname").val() ;
        tx.executeSql('SELECT img FROM Item WHERE name = ? ', [nn], function (tx, result){
            img_src = result.rows[0].img ;
            if (img_src != "")
                 img.src = img_src; 
            else
                $("#addimg").hide();


            
        } , null )
    });
    
}



/// add options to select
db.transaction(function (tx) { 
    tx.executeSql('SELECT name FROM Item ', [], function (tx, result){

        for (let i = 0; i < result.rows.length; i++) {

            //console.log( result.rows[i].name );
            $('#dname').append(new Option(result.rows[i].name));
          
        }
        add_image();
    } , null )
});

/// quantity
$("#text1").hide();

let quan = document.querySelector("#quan");
quan.addEventListener("input", check_quan);

function check_quan() {
    let q =$("#quan").val() ;
    let n = $("#dname").val() ;
    db.transaction(function (tx) { 
        tx.executeSql('SELECT quantity FROM Item WHERE name = ?', [n], function (tx, result){

                if( parseInt(result.rows[0].quantity ) < q)
                {
                    $("#text1").show();
                    $("#sell_fun").prop('disabled', true);
                }
                else 
                { 
                    $("#text1").hide(); 
                    $("#sell_fun").prop('disabled', false);
                }
            } , function(){console.log("error"); } )
        });   
    
}

/// sell
let sell_f = document.querySelector("#sell_fun");
sell_f.addEventListener("click", sell_function);


function sell_function() {
    let q =$("#quan").val() ;
    let n = $("#dname").val() ;

    if(q == "")  { alert ("enter quantity"); }
    else
    {
        db.transaction(function (tx) { 
            tx.executeSql('UPDATE Item SET quantity = quantity - ? WHERE name = ?',[q,n] ); 
        })  

        db.transaction(function (tx) { 
            tx.executeSql('SELECT username FROM USERS WHERE active = "True"', [], function (tx, result){
                let user_n =result.rows[0].username;
                let today = new Date();
                let x = today.getDate() + "/" + today.getMonth()+1 + "/" + today.getFullYear() ;
                tx.executeSql('INSERT INTO invoice (username , type , item_name ,quantity ,date) VALUES (?,?,?,?,?)',[user_n,"sell",n,q ,x]  )
            
                location.reload();
                //location.href ="sell.html";
    
            } , null )
        })  
    }   
}

///////////// done
let done = document.querySelector("#done");
done.addEventListener("click", done_fun);

function done_fun() {
    db.transaction(function (tx) { 
        tx.executeSql('SELECT type FROM USERS WHERE active = "True"', [], function (tx, result){
            let t =result.rows[0].type;
            if (t == "admin")  { location.href ="admin.html";  }
            else {  location.href ="user.html";  }

             
        } , null )
    });
    
}