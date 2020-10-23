const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Create connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    database : 'cuestaBlanca',
    password: null,
    user: 'root',
});

//Connect
connection.connect(function(err) {
    if(err){
        console.log(err);
    }else{
        console.log("Conexion establecida con exito.")
    }
  });


//Show previous reservation
app.get("/reservation",function(req,res){
    connection.query("SELECT startDate, endDate FROM `reservation`",function(err,result){
        if(!err){
           res.send(result);
        }else{
            console.log(err);
        }
    });
  });


//New reservation
app.post("/reservation",function(req,res){
  var insert = "INSERT INTO `reservation`(`fullName`, `email`, `phone`, `adultsNumber`, `childrenNumber`, `arrivalTime`, `startDate`, `endDate`,`price`, `reservationID`) VALUES  (?,?,?,?,?,?,?,?,?,?)";
  var array = [req.body.fullName ,req.body.email, req.body.phone, req.body.adultsNumber , req.body.childrenNumber, req.body.arrivalTime,  new Date(req.body.startDate),  new Date(req.body.endDate), req.body.price, req.body.reservationID ];
  connection.query(insert,array,function(err,result){
      if(!err){
          res.send(result);
          console.log(result);
       }else{
          res.send(err);
       }
  })
});



app.post("/reservation/date",function(req,res){
    var insert = "INSERT INTO `dates`(date) VALUES  (?)";
    var array = [new Date(req.body.date) ];
    connection.query(insert,array,function(err,result){
        if(!err){
            res.send(result);
            console.log(result);
         }else{
            res.send(err);
         }
    })
  });

app.listen(3000)