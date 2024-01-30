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
const listDate = document.querySelectorAll('h2');


const changeTheme = () => {
    /**Changes the current theme of the user */
    pageBody.classList.toggle('dark-body')
    form.classList.toggle('dark-form')
    input.classList.toggle('dark-input')
    callToAction.classList.toggle('dark-call-to-action')
    wrapper.classList.toggle('dark-wrapper')
    listDate.forEach(date => {
        date.classList.toggle('date')
    });

    todoItems.forEach(item => {
        item.classList.toggle('dark-todo-item')
    })
    anchors.forEach(anchor => {
        anchor.classList.toggle('dark-anchor');
    });
}


const changeThemeIcon = () => {
    modeIcons.firstElementChild.classList.toggle('hidden');
    modeIcons.lastElementChild.classList.toggle('hidden');
};

// Apply previously used theme
const mode = localStorage.getItem("mode");

if (mode === null) {
    localStorage.setItem('mode', 'light mode');
} else if (mode === 'dark mode'){
    changeThemeIcon();
    changeTheme();
};


// Toggle between dark and light mode.
modeIcons.addEventListener('click', e => {
    const clickedModeIcon = e.target.alt;
    changeThemeIcon();

    if (clickedModeIcon === "dark mode") {
         changeTheme();
         localStorage.setItem('mode', 'dark mode');
    } else {
        changeTheme();
        localStorage.setItem('mode', 'light mode');
    }
});


const  sendData = async e => {
    /**Send the checkbox id and checked status to the server */
    if (e.target.name === 'checkbox'){
        
        const data = {item: e.target.id, state: e.target.checked}
    
        const response = await fetch('/todoItem', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    }
}

todos.addEventListener('click', sendData);

