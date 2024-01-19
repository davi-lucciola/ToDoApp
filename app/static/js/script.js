import { renderTasks, showMessage, clearMessage } from "./components.js";
import { HttpClient } from "./http.js";
import { TaskService } from "./task.js";

// App Config
const BASE_PATH = 'http://127.0.0.1:5000'
const API = new HttpClient(BASE_PATH)
const taskService = new TaskService(API)

// Html Tags
const taskForm = document.getElementById('create-task')

// Global States
var tasks = []

// Handlers
// Load Page
async function handleLoadData() {
    let response = await taskService.findAll()
    
    if (response.status == 204) {
        showMessage('Não há tarefas cadastradas')
        return
    }

    clearMessage()
    tasks = await response.json()
    
    renderTasks(tasks)
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
    tasks.push(task)
    clearMessage()
    renderTasks(tasks)
}

export async function handleSwitchCompleteTask(event) {
    let checkbox = event.target
    let taskId = event.target.id.split('-')[1]
    const liTask = document.getElementById(`task-${taskId}`)
    liTask.className = checkbox.checked ? 'task-completed' : 'task' 
    
    
    let task = tasks.find((task) => task.id = taskId)
    task.completed = checkbox.checked
    taskService.update(task)
}

export async function handleDeleteEvent(event) {
    let button = event.target
    let taskId = button.id.split('-')[1]

    const response = await taskService.delete(taskId)

    if (!response.ok) {
        showMessage('Não foi possivel excluir a tarefa.')
        return
    }

    tasks = tasks.filter((task) => task.id != taskId)
    let liTask = document.getElementById(`task-${taskId}`)
    liTask.remove()
}

// Event listers
addEventListener('load', handleLoadData)
taskForm.addEventListener('submit', handleCreateTask)

