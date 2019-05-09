var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var express = require('express');

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/connectYou";


// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + './dist/index.html');
});

app.get('/home', function (req, res) {
  res.sendFile((path.join(__dirname, '../dist')) +  '/question.html');
});

app.use("/login", function (req, res, next) {
  let credentials = req.query;
  if (!credentials || credentials.name !== 'harryanddavid' || credentials.pass !== 'harryanddavid@123') {
    res.statusCode = 401;
    res.end('Access denied')
  } else {

  }
});

app.use("/registration", function (req, res, next) {
  let userData = req.query;
  MongoClient.connect(url,
    function (err, db) {
      if (err) throw err;
      console.log("Database connected!");
      var dbo = db.db("connectYou");

      dbo.collection("Users").insertOne(userData, function (err, res) {
        if (err) {
          throw err;
        } else {
          db.close();
        }
      });
    });

  res.send("success");
  res.end('Success');

});


http.listen(3000, function () {
  console.log('listening on *:3000');
});
