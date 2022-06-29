// selectores
const form = document.getElementById('form');
const taskContainer = document.querySelector('.task-container');
const titleTask = document.querySelector('#inputTask');
const template = document.querySelector('#templateTask');
const fragment = document.createDocumentFragment();

// Arreglo de tareas
let tasks = [];

// EventListeners
eventListeners();
function eventListeners(){
    form.addEventListener('submit', saveTask);
    document.addEventListener('DOMContentLoaded', () =>{
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        showTasks();
    })
}


// funciones
function saveTask(e){
    e.preventDefault();

    const task = {
        id: Date.now(),
        title: titleTask.value
    };

    if(titleTask === ''){
        return;
    }

    tasks = [...tasks, task];

    showTasks();
    form.reset();

}

function showTasks(){
    clearHTML();

    if(tasks.length > 0){
        for(let i = 0; i < tasks.length; i++){
            let id = tasks[i].id;
            let title = tasks[i].title;
            
            const clone = template.content.cloneNode(true);
            clone.querySelector('.task').setAttribute('data-id', id);
            clone.querySelector('.label').textContent = title;
            clone.querySelector('.btn-delete').onclick = function(){
                deleteTask(id);
            }
            fragment.appendChild(clone);
        }
        taskContainer.appendChild(fragment);
        document.querySelector('.stats').classList.add('block');
        document.querySelector('.stats').textContent = `Tareas pendientes: ${tasks.length}`;
    }else{
        document.querySelector('.stats').classList.remove('block');
    }

    synchronizeTask();
}

function synchronizeTask(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    showTasks();
}

function clearHTML(){
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    }
    
}



