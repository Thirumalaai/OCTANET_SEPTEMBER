const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to fetch tasks and render them
const renderTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        li.querySelector('span').addEventListener('click', () => toggleCompletion(task.id));
        taskList.appendChild(li);
    });
};

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value;
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { id: Date.now(), text: taskText, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
};

// Function to toggle task completion
const toggleCompletion = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Function to edit a task
const editTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    const newTaskText = prompt("Edit task:", task.text);
    if (newTaskText) {
        task.text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
};

// Function to delete a task
const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    renderTasks();
};

// Event listeners
addTaskBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);
