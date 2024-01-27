const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');

let todoList = [{
    dateCreated: 'Tuesday',
    todo: 'First todo item',
    completed: false
}];

// Home route, renders all todos
app.get('/', (req, res) => {
    const numberOfTodos = todoList.length;

    res.render('index', { list: todoList, numb: numberOfTodos });
});

// Home post route, recieve data from ejs form and create new todo object.
app.post('/', (req, res) => {
    const item = req.body.newTodo;
    const date = new Date();
    
    const newTodoItem = {
        dateCreated: date.toDateString(),
        todo: item,
        completed: false
    }
    todoList.push(newTodoItem);

    res.redirect('/');
});

// Completed route, filter all completed todos
app.get('/completed', (req, res) => {

    const completedTodos = todoList.filter(item => item.completed === true);

    res.render('index', { list: completedTodos, numb: completedTodos.length });
})

// Active route, filter all active todos.
app.get('/active', (req, res) => {
    const activeTodos = todoList.filter(item => item.completed === false);

    res.render('index', { list: activeTodos, numb: activeTodos.length });
});

// Recieve todo status from frontend js.
app.post("/todoItem", (req, res) => {
    const todoIndex = Number(req.body.item);
    const todoNewState = req.body.state;

    todoList[todoIndex].completed = todoNewState;
    res.send({ feedback: 'State updated' });
});

// Delete an item.
app.post("/todoItem/:todoIndex", (req, res) => {
    res.redirect('/');
});

// delete all checked todos
app.get('/clearCompleted', (req, res) => {
    for (let i = 0; i < todoList.length; i++) {
        const todoItem = todoList[i];
        if (todoItem.completed) {
            todoList.splice(i, 1);
        }
    }
    
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('Hello dear! Listening at port 3000.');
});