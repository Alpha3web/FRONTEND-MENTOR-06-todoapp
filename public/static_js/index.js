
const todos = document.querySelector('.todo-list');
const callToAction = document.querySelector('.call-to-action');
const anchor = document.querySelectorAll('.call-to-action a');
const modeIcons = document.querySelector('.mode-icons');

// To apply theme
const pageBody = document.querySelector('body');
const form = document.querySelector('form');
const input = document.querySelector('input');
const todoItems = document.querySelectorAll('.todo-item');
const wrapper = document.querySelector('.wrapper')

const changeTheme = () => {
    pageBody.classList.toggle('dark-body')
    form.classList.toggle('dark-form')
    input.classList.toggle('dark-input')
    callToAction.classList.toggle('dark-call-to-action')
    wrapper.classList.toggle('dark-wrapper')

    todoItems.forEach(item => {
        item.classList.toggle('dark-todo-item')
    })
}

// if (input.classList.contains('for-light-theme')) {
//     input.classList.replace('for-light-theme', 'for-dark-theme');
// } else {
//     input.classList.add('for-dark-theme');
// }
// anchor.forEach(a => {

//     if (a.classList.contains('light-anchor')) {
//         a.classList.replace('light-anchor', 'dark-anchor');
//     } else {
//         a.classList.add('dark-anchor');
//     }
// });


    // input.classList.add('for-light-theme');
// input.classList.replace('for-dark-theme', 'for-light-theme');
// anchor.forEach(a => {
//     a.classList.replace('dark-anchor', 'light-anchor');
// });

// Toggle between dark and light mode.
modeIcons.addEventListener('click', e => {
    const clickedModeIcon = e.target.alt;

    modeIcons.firstElementChild.classList.toggle('hidden');
    modeIcons.lastElementChild.classList.toggle('hidden');

    if (clickedModeIcon === "dark mode") {
         changeTheme()
    } else {
        changeTheme()
    }
});

todos.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('div')) {
        e.target.style.background = `linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))`;
        e.target.parentElement.style.textDecoration = `line-through`;
        e.target.firstChild.style.display = 'block';

        e.target.parentElement.classList.add('comp');

        todoItems();
    }


    // deleting todos

    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        todoItems();
    }
});

// managing todos


callToAction.addEventListener('click', e => {
    e.preventDefault();

    switch (e.target.hash) {


        // all todos

        case '#all':
            Array.from(todos.children).forEach(allTodo => {
                if (allTodo.classList.contains('hidden')) {
                    allTodo.classList.remove('hidden');
                }
            })
            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // completed todos

        case '#completed':

            const completedTodos = () => {
                Array.from(todos.children)
                    .filter(completedTodo => {
                        return completedTodo.className !== 'comp';
                    })
                    .forEach(completedTodo => {

                        if (completedTodo.classList.contains('hidden')) {
                            completedTodo.classList.remove('hidden');
                        } else {
                            completedTodo.classList.add('hidden');
                        }
                    });
            }


            completedTodos();
            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // active todos

        case '#active':
            const activeTodos = () => {
                Array.from(todos.children)
                    .filter(activeTodo => {
                        if (activeTodo.className === 'comp') {
                            activeTodo.classList.add('hidden');
                        } else {
                            activeTodo.classList.remove('hidden');
                        }

                    });
            }


            activeTodos();

            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // clear all completed todos


        case '#clear-completed':
            const clearCompleted = () => {
                Array.from(todos.children)
                    .forEach(clearTodo => {

                        if (clearTodo.classList.contains('comp')) {
                            clearTodo.remove();
                        }

                    });
            }
            clearCompleted();
            break;
    }
})

// darkTheme();

