var request = require('request');
var helloWorld = require('../meadowlark.js')
var base_url = 'http://localhost:3000/'
var mongoose = require('mongoose');
var student = require('../models/student.js')
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

describe('Hello World Test', function(){
  describe('GET/', function() {
    it('returns status code 200', function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns Hello World', function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe('Meadowlark Travel');
        done();
      });
    });
  });

  describe('GET /student/1', function(){
    var url = base_url + 'student/1';
    var currentStudent = null;
    beforeEach(function(done){
      debugger;
      currentStudent = db.student.insert({
        firstName: 'Kaleb', 
        lastName: 'Davis', 
        GPA: 3.0
      });
    });
    afterEach(function(done){
      db.dropCollection('student', function(){
        done();
      });
    });
    it('returns a status code 200', function(done) {
      request.get(url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('returns a student', function(done) {
      request.get(url, function(error, response, body) {
        expect(response.body).toBe(JSON.stringify({'a': 1}));
        done();
      });
    });
  });
});
