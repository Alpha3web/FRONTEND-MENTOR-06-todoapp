const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const todoList = ['First todo item'];

app.get('/', (req, res) => {
    const numberOfTodos = todoList.length;

    res.render('index', {list: todoList, numb: numberOfTodos});
});

app.post('/', (req, res) => {
    const item = req.body.newTodo;
    todoList.push(item);

    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Hello dear! Listening at port 3000.');
});