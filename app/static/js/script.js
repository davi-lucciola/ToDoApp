import { Task } from "./components.js";
import { HttpClient } from "./http.js";
import { TaskService } from "./task.js";

// App Config
const BASE_PATH = 'http://localhost:5000'
const API = new HttpClient(BASE_PATH)
const taskService = new TaskService(API)

// Html Tags
const ulTasks = document.getElementById('tasks');

// Handlers
async function handleCreateTask(event) {
    event.preventDefault()

    let task = {
        title: document.getElementById('task-title').value.trim(),
        description: document.getElementById('task-description').value.trim(),
        completed: false
    }
    
    let response = await taskService.create(task).then(data => data.json())
    task.id = response.createdId
    ulTasks.appendChild(Task(task))
}

export async function handleSwitchCompleteTask(event) {
    let checkbox = event.target
    let taskId = event.target.id.split('-')[1]
    const liTask = document.getElementById(`task-${taskId}`)
    liTask.className = checkbox.checked ? 'task-completed' : 'task' 
    
    let task = await taskService.findById(taskId).then(data => data.json())
    task.completed = checkbox.checked
    taskService.update(task)
}

async function handleLoadData() {
    let response = await taskService.findAll()
    let tasks = await response.json()

    for (let task of tasks) {
        ulTasks.appendChild(Task(task))
    }
}

// Load Page
addEventListener('load', handleLoadData)

// Create Task
const taskForm = document.getElementById('create-task')
taskForm.addEventListener('submit', handleCreateTask)

// Complete / Uncomplete Task
