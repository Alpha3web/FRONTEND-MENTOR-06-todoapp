const form = document.querySelector('form');
const input = document.querySelector('input');
const todos = document.querySelector('.todo-list');
const callToAction = document.querySelector('.call-to-action');
const anchor = document.querySelectorAll('.call-to-action a');
const modes = document.querySelector('header');



// themes

let style = document.createElement('style');

const jsStyle = () => {
    if (document.head.lastElementChild.tagName === 'STYLE') {
        document.head.lastElementChild.remove();
        document.head.insertAdjacentHTML("beforeend", style);
    } else {
        document.head.insertAdjacentHTML("beforeend", style);
    }
}


// dark theme function
const darkTheme = () => {
    style = `
    <style>
    body{
    background-color: var(--Very-Dark-Blue);
    background-image: url(images/bg-desktop-dark.jpg);
    }
    form {
    background-color: var(--Very-Dark-Desaturated-Blue);
    }
    
    input {
    background: var(--Very-Dark-Desaturated-Blue);
    }

    .todo-list > li{
        color: var(--Light-Grayish-Blue);
        border-bottom: 1px solid var(--Very-Dark-Grayish-Blue-1);
    }
    
    .wrapper{
    background: var(--Very-Dark-Desaturated-Blue);
    }
    
    .call-to-action{
    color: var(--Very-Dark-Grayish-Blue);
    }
    @media only screen and (max-width: 600px){
    body {
        background-image: url(images/bg-mobile-dark.jpg);
    }
    }
    </style>
    `;

    jsStyle();

    if (input.classList.contains('for-light-theme')) {
        input.classList.replace('for-light-theme', 'for-dark-theme');
    } else {
        input.classList.add('for-dark-theme');
    }
    anchor.forEach(a => {

        if (a.classList.contains('light-anchor')) {
            a.classList.replace('light-anchor', 'dark-anchor');
        } else {
            a.classList.add('dark-anchor');
        }
    });
}
// Light theme
const lightTheme = () => {
    style = `
    <style>
    body{
    background-color: var(--Lt-Very-Light-Gray);
    background-image: url(images/bg-desktop-light.jpg);
    }
    form {
    background-color: var(--Lt-Very-Light-Gray);
    }
    
    input {
    background-color: var(--Lt-Very-Light-Gray);
    }
    
    .wrapper{
    background-color: var(--Lt-Very-Light-Gray);
    }

    .todo-list > li{
        color: var(--Lt-Very-Dark-Grayish-Blue);
        border-bottom: 1px solid var(--Lt-Very-Light-Grayish-Blue);
    }

    
    .call-to-action{
    color: var(--Lt-Dark-Grayish-Blue);
    }
    @media only screen and (max-width: 600px){
    body {
        background-image: url(images/bg-mobile-light.jpg);
    }
    }
    </style>
    `;

    jsStyle();

    // input.classList.add('for-light-theme');
    input.classList.replace('for-dark-theme', 'for-light-theme');
    anchor.forEach(a => {
        a.classList.replace('dark-anchor', 'light-anchor');
    });
}


modes.addEventListener('click', e => {
    if (e.target.classList.contains('dark-mode')) {
        darkTheme();
        e.target.style.display = 'none'
        e.target.nextElementSibling.style.display = 'block';
    } if (e.target.classList.contains('light-mode')) {
        lightTheme();
        e.target.style.display = 'none'
        e.target.previousElementSibling.style.display = 'block';
    }
})

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

darkTheme();

