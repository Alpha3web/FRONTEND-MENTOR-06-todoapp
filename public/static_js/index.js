const todos = document.querySelector('.todo-list');
const callToAction = document.querySelector('.call-to-action');
const modeIcons = document.querySelector('.mode-icons');

// To apply theme
const pageBody = document.querySelector('body');
const form = document.querySelector('form');
const input = document.querySelector('.light-text-input');
const todoItems = document.querySelectorAll('.todo-item');
const wrapper = document.querySelector('.wrapper');
const anchors = document.querySelectorAll('.light-anchor');

const changeTheme = () => {
    pageBody.classList.toggle('dark-body')
    form.classList.toggle('dark-form')
    input.classList.toggle('dark-input')
    callToAction.classList.toggle('dark-call-to-action')
    wrapper.classList.toggle('dark-wrapper')

    todoItems.forEach(item => {
        item.classList.toggle('dark-todo-item')
    })
    anchors.forEach(anchor => {
        anchor.classList.toggle('dark-anchor');
    });
}


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


const  sendData = async e => {
    if (e.target.name === 'checkbox'){
        
        const data = {item: e.target.id, state: e.target.checked}
    
        const response = await fetch('/todoItem', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Success! " + result.feedback);
    }
}

todos.addEventListener('click', sendData);

// managing todos


callToAction.addEventListener('click', e => {
    // e.preventDefault();

    switch (e.target.hash) {


        // all todos

        case '#all':

            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // completed todos

        case '#completed':

            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // active todos

        case '#active':

            e.target.style.color = 'var(--Bright-Blue)';
            break;

        // clear all completed todos


        case '#clear-completed':
    }
})


