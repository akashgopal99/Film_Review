const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.use(express.static('Client'));
app.use(bodyParser.urlencoded({extended: false}));

let movies = {};

app.get('/list', function (req, resp){
    resp.send(Object.keys(movies));
});

app.post('/add', function (req, resp){
    const movie = req.body.movie_name;
    movies[movie] = -1;
    resp.send('Successfully Added Movie');
  });

module.exports = app;