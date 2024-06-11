let taskList = [];
let superButton = document.getElementById('super');

function taskLoad() {
    let list = localStorage.getItem('taskList');
    taskList = list ? JSON.parse(list) : [];
    updateTasks();
}

function addTask(event) {
    event.preventDefault();
    let description = document.getElementById('description');
    if (description.value == '') {
        showMessage();
    } else {
        taskList.push(description.value);
        localStorage.setItem('taskList', JSON.stringify(taskList))
        description.value = '';
        updateTasks();
    }
}

function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function showMessage() {
    let message_type = document.getElementById('message_type');
    message_type.innerText = 'Erro: ';

    let message = document.getElementById('message');
    message.innerText = 'Você precisa descrever a nova tarefa.';

    let alert = document.getElementById('alert');
    alert.style.display = 'block'; setTimeout(() => {
        closeMessage();
    }, 4000);
}

function updateTasks() {
    let divTasks = document.getElementById('tasks');
    divTasks.innerHTML = ''; // Limpa o conteúdo anterior para evitar duplicatas

    if (taskList.length > 0) {
        let newOl = document.createElement('ol');

        taskList.forEach((task) => {

            let newLi = document.createElement('li');
            newLi.innerText = task;

            let removeTask = document.createElement('button');
            removeTask.textContent = 'X';

            newLi.appendChild(removeTask);
            newOl.appendChild(newLi);
        });

        divTasks.appendChild(newOl);

        let removeButtons = divTasks.querySelectorAll('button');
        removeButtons.forEach((button, index) => {
            button.addEventListener("click", function () {
                newOl.removeChild(newOl.childNodes[index]);
                remove(index)
            });
        });
    }
}

function removeAll() {
    taskList = [];
    localStorage.setItem('taskList', taskList)
    updateTasks();
}


function highlightRandomTask() {
    if (taskList.length > 0) {
        let previousHighlight = document.getElementById('highlight');
        if (previousHighlight) {
            previousHighlight.removeAttribute('id');
        }
        randomIndex = Math.floor(Math.random() * taskList.length);
        let randomTask = document.getElementById('tasks').children[0].children[randomIndex];
        randomTask.id = 'highlight';
        console.log(randomTask);
    }
} 
