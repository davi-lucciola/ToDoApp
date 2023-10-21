import { Task } from "./components.js";
import { HttpClient } from "./http.js";
import { TaskService } from "./task.js";

// App Config
const BASE_PATH = 'https://to-do-app-hwx0.onrender.com'
const API = new HttpClient(BASE_PATH)
const taskService = new TaskService(API)

// Html Tags
const taskForm = document.getElementById('create-task')
const ulTasks = document.getElementById('tasks');

// Handlers
// Load Page
async function handleLoadData() {
    let response = await taskService.findAll()
    let tasks = await response.json()

    for (let task of tasks) {
        ulTasks.appendChild(Task(task))
    }
}

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

export async function handleDeleteEvent(event) {
    let button = event.target
    let taskId = button.id.split('-')[1]

    let liTask = document.getElementById(`task-${taskId}`)
    liTask.remove()

    await taskService.delete(taskId)
}

// Event listers
addEventListener('load', handleLoadData)
taskForm.addEventListener('submit', handleCreateTask)

