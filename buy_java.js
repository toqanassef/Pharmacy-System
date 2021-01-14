
var db = openDatabase('pharmacy', '1.0', 'pharmacy DB', 2 * 1024 * 1024);

//$("#showscreenshot").hide(); 
var img ="";

/// add options to select
db.transaction(function (tx) { 
    tx.executeSql('SELECT name FROM Item ', [], function (tx, result){

        for (let i = 0; i < result.rows.length; i++) {

            //console.log( result.rows[i].name );
            $('#dname').append(new Option(result.rows[i].name));
          
        }
    } , null )
});

/// disable new item
$("#dname").change(function () {
    if ($(this).val() == 1) {
        $("#new").prop( "disabled", false );
    }
    else
    {
        $("#new").prop( "disabled", true );
    }
  });

//  add new item
let addnew = document.querySelector("#new");
addnew.addEventListener("input", check_item);

$("#text1").hide();

function check_item() {
    let na = this.value ;
    db.transaction(function (tx) { 
        tx.executeSql('SELECT name FROM Item WHERE name = ?', [na], function (tx, result){
                if(result.rows.length == 1)
                {
                    $("#text1").show();
                }
                else { $("#text1").hide(); }
            } , function(){console.log("error");} )
        });     
}
/// quantity

///////////////////////////
/// buy
let buy_f = document.querySelector("#buy_fun");
buy_f.addEventListener("click", buy_function);

function buy_function() {
    let nam1 = $("#dname").val() ;
    let nam = addnew.value;
    let q =$("#quan").val() ;
    if(q == "")  { alert ("enter quantity"); }
    else 
    {
        if (  nam1 != 1  )
        {
            oldit(nam1,q) ; 
        }
        else if (nam =="") { alert ("enter item name"); } 
        else 
        {
            db.transaction(function (tx) { 
                tx.executeSql('SELECT name FROM Item WHERE name = ?', [nam], function (tx, result){
                        if(result.rows.length == 1)
                           {    oldit(nam,q);  }
                        else { newit(nam,q) ;}
                    } , function(){console.log("error");} )
                });
        }       
    }
}


function oldit(n,q) {
    db.transaction(function (tx) { 
        tx.executeSql('UPDATE Item SET quantity = quantity + ? WHERE name = ?',[q,n] ); 
        add_invoice(n,q);
    })  
}

function newit(n,q) {
    db.transaction(function (tx) { 
        tx.executeSql('INSERT INTO Item (name ,  quantity ,img  ) VALUES (?,?,?)',[n,q,img] ); 
        add_invoice(n,q);
    })  
}

function add_invoice(n,q) {
    db.transaction(function (tx) { 
        tx.executeSql('SELECT username FROM USERS WHERE active = "True"', [], function (tx, result){
            let user_n =result.rows[0].username;
            let today = new Date();
            let x = today.getDate() + "/" + today.getMonth()+1 + "/" + today.getFullYear() ;
            tx.executeSql('INSERT INTO invoice (username , type , item_name ,quantity ,date) VALUES (?,?,?,?,?)',[user_n,"buy",n,q ,x]  )
        

            location.href ="buy.html";

        } , null )
    })  
    
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

//// pic
var video1 = document.querySelector("#videoElement");
var canvas  = document.querySelector("#showscreenshot");


function play() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    {
        navigator.mediaDevices.getUserMedia({video: true, audio:false})
        .then(function (str)
         { video1.srcObject = str;  }  )
        .catch(function (error) 
        { console.log("Something went wrong!");  }  );
    }
}

function takescreenshot () {
    canvas.width = video1.videoWidth;
    canvas.height = video1.videoHeight;
    canvas.getContext("2d").drawImage(video1, 0, 0);
    img = canvas.toDataURL("image/webp");
    //console.log(img)
    //// stop
    var stream = video1.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

  video1.srcObject = null;

  //// save image
}

