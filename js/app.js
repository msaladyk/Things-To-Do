document.addEventListener('DOMContentLoaded', function() {
// Add button
var addTaskBtn = document.querySelector('#addTaskButton');

// Task input
var taskInput = document.querySelector('#taskInput');

// Error
var error = document.querySelector('#errorPlaceholder');

// Task List
var taskList = document.querySelector('#taskList');

// Counter
var counter = document.querySelector('#counter span');
counter.innerText = 0;

// Add Task Event (enter)
    taskInput.addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            if (taskInput.value.length > 4 && taskInput.value.length < 101) {
                var newTask = document.createElement('li');
                newTask.innerHTML = '<button></button><div><h1></h1></div><button></button>';
                newTask.style.listStyleType = 'none';
                newTask.style.borderBottom = '2px solid black';
                newTask.firstElementChild.className = 'complete';
                newTask.firstElementChild.display = 'inline';
                newTask.firstElementChild.nextElementSibling.className = 'task';
                newTask.firstElementChild.nextElementSibling.innerText = taskInput.value;
                newTask.firstElementChild.nextElementSibling.style.margin = '0 30px 0 10px';
                newTask.lastElementChild.className = 'deleteBtn';
                newTask.lastElementChild.display = 'inline-block';
                var hook = document.querySelector('#taskList');
                counter.innerText++;
                hook.appendChild(newTask);
                taskInput.value = '';
                error.innerText = '';
            } else {
                error.style.color = '#ed2553';
                error.style.fontWeight = '600';
                error.innerText = 'Task must contain at least 5 and no more than 100 characters';
            }
            localStorage.setItem('tasks', taskList.innerHTML);
            localStorage.setItem('counter', counter.innerHTML);
        }
    });
// Add Task Event (click)
    addTaskBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (taskInput.value.length > 4 && taskInput.value.length < 101) {
            var newTask = document.createElement('li');
            newTask.innerHTML = '<button></button><div><h1></h1></div><button></button>';
            newTask.style.listStyleType = 'none';
            newTask.style.borderBottom = '2px solid black';
            newTask.firstElementChild.className = 'complete';
            newTask.firstElementChild.display = 'inline';
            newTask.firstElementChild.nextElementSibling.className = 'task';
            newTask.firstElementChild.nextElementSibling.innerText = taskInput.value;
            newTask.firstElementChild.nextElementSibling.style.margin = '0 30px 0 10px';
            newTask.lastElementChild.className = 'deleteBtn';
            newTask.lastElementChild.display = 'inline-block';
            var hook = document.querySelector('#taskList');
            counter.innerText++;
            hook.appendChild(newTask);
            taskInput.value = '';
            error.innerText = '';
        } else {
            error.style.color = '#ed2553';
            error.style.fontWeight = '600';
            error.innerText = 'Task must contain at least 5 and no more than 100 characters';
        }
        localStorage.setItem('tasks', taskList.innerHTML);
        localStorage.setItem('counter', counter.innerHTML);
    });
    // Complete / incomplete
    taskList.addEventListener("click", function (e) {
        if (e.target.className === 'complete' && e.target.parentElement.className === "") {
            e.target.parentElement.classList.toggle('completed');
            counter.innerText--;
            e.target.style.backgroundImage = "url('images/correct-mark.png')";
            e.target.style.backgroundSize = 'contain';
            e.target.style.backgroundOrigin = 'content-box';
            e.target.style.backgroundRepeat = 'no-repeat';
            e.target.style.backgroundPosition = 'center';
        } else if (e.target.className === 'complete' && e.target.parentElement.className === "completed") {
            e.target.parentElement.classList.toggle('completed');
            counter.innerText++;
            e.target.style.background = 'none';
        }
        localStorage.setItem('tasks', taskList.innerHTML);
        localStorage.setItem('counter', counter.innerHTML);
    });
    // Delete task button
    taskList.addEventListener('click', function(event) {
       if(event.target.className === 'deleteBtn') {
           event.target.parentElement.remove();
           if (event.target.parentElement.className !== 'completed') {
               counter.innerText--;
           }
       }
        localStorage.setItem('tasks', taskList.innerHTML);
        localStorage.setItem('counter', counter.innerHTML);
    });
    // Remove all
    var rmvBtn = document.querySelector('#removeFinishedTasksButton');
    rmvBtn.addEventListener('click', function() {
        var lis = document.querySelectorAll('#taskList li.completed');
        for (var i = 0; i < lis.length; i++) {
            lis[i].remove();
        }
        localStorage.setItem('tasks', taskList.innerHTML);
        localStorage.setItem('counter', counter.innerHTML);
    });
    // localStorage
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
    var savedCounter = localStorage.getItem('counter');
    if (savedCounter) {
        counter.innerHTML = savedCounter;
    }
});