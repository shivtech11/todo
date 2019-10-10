var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//connect to the database 
mongoose.connect('mongodb+srv://test:test@cluster0-599bg.mongodb.net/todo');

//create a schema -this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get data from mongodb and pass it to vies
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });

    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from monodb
        // console.log(item);
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });

    });
}


// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding ass' }];

// module.exports = function(app) {

//     app.get('/todo', function(req, res) {
//         res.render('todo', { todos: data });
//     });

//     app.post('/todo', urlencodedParser, function(req, res) {
//         data.push(req.body);
//         res.json(data);
//         console.log(data);
//         //res.render('todo', { todos: data });
//     });

//     app.delete('/todo/:item', urlencodedParser, function(req, res) {
//         console.log(item);
//         data = data.filter(function(todo) {
//             return todo.item.replace(/ /g, '-') !== req.params.item;
//         });
//         res.json(data);
//     });
// };