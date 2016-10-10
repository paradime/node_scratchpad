var express = require('express');
var app = express();
var Student = require('./models/student.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.once('open', function() {
});

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.type('text/plain');
  res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Meadowlark Travel');
});

app.get('/student/:id', function(req, res){
  res.type('application/json');
  Student.findById(req.params.id, function(err, student){
    res.send(student);
  });
});

//custom 404
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') +
    '; press Ctrol-C to terminate.');
});

exports.closeServer = function(){
  server.close();
};
