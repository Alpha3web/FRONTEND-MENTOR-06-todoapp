const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');

const groupByDate = (list => {
    return _.groupBy(list, 'dateCreated')
});

const getDate = () => {
    const today = new Date();

    const options = {
        day: 'numeric',
        month: 'long', 
        weekday: 'long'
    }

    return today.toLocaleDateString("en-US", options);
};

let todoList = [{dateCreated: 'Monday, January 29', todo: 'First todo item', completed: false}];


// Home route, renders all todos
app.get('/', (req, res) => {

    const numberOfTodos = todoList.length;
    console.log(groupByDate(todoList))

    res.render('index', { list: groupByDate(todoList), numb: numberOfTodos });
});

// Home post route, recieve data from ejs form and create new todo object.
app.post('/', (req, res) => {
    const item = req.body.newTodo;
    
    const newTodoItem = {
        dateCreated: getDate(),
        todo: item,
        completed: false
    }
    todoList.push(newTodoItem);

    res.redirect('/');
});

// Completed route, filter all completed todos
app.get('/completed', (req, res) => {

    const completedTodos = todoList.filter(item => item.completed === true);

    res.render('index', { list: groupByDate(completedTodos), numb: completedTodos.length });
})

// Active route, filter all active todos.
app.get('/active', (req, res) => {
    console.log(todoList)
    const activeTodos = todoList.filter(item => item.completed === false);

    res.render('index', { list: groupByDate(activeTodos), numb: activeTodos.length });
});

// Recieve todo status from frontend js.
app.post("/todoItem", (req, res) => {
    const todoIndex = Number(req.body.item);
    const todoNewState = req.body.state;

    todoList[todoIndex].completed = todoNewState;
    res.send({ feedback: 1 });
});

// Delete an item.
app.get("/deleteTodo/:todoId", (req, res) => {
    const todoIndex = Number(req.params.todoId);
    todoList.splice(todoIndex, 1);

    res.redirect('/');
});

// delete all checked todos
app.get('/clearCompleted', (req, res) => {
    _.remove(todoList, item => item.completed)
    
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('Hello dear! Listening at port 3000.');
});