
var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var connection = mysql.createConnection
({
  host     : 'localhost',
  user     : 'root',
  password : 'sravani@123',
  database : 'node'
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn"+err);    
}
});

app.get("/",function(req,res)
{
    // (for get method)
     var p = req.param('name');
     var X = req.param('emailid')
    var values=[p,X];
    console.log(req.param('p'));
connection.query('select * from users where Name= ? and emailid= ?',values, function(err, rows, fields) {
  if (!err){
    console.log('The solution is: ', rows);
    res.write(JSON.stringify(rows));
  }
  else{
    console.log('Error while performing Query.'+err);
     res.write("error!");
  }
  res.end();
  });
 
});


app.post("/post",function(req,res)
{
// read here all fields mentioned in the database
var name=req.body.name;
var emailid=req.body.emailid;
var password=req.body.password;
var address=req.body.address;
var values=[name,emailid,password,address];
connection.query('insert into users values (?,?,?,?)',values, function(err, rows, fields) {

    if (!err){
    console.log('The solution is: ', rows);
    res.write(JSON.stringify(rows));
  }
  else{
    console.log('Error while performing Query.'+err);
     res.write("error!");
  }
  res.end();
  });

});
 app.listen(3000);