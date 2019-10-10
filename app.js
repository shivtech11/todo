var express = require('express');

var todocontroller = require('./controllers/todoController');

var app = express();

//set up tempelates
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todocontroller(app);

//listen port
app.listen(3000);