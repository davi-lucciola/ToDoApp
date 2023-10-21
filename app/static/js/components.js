import { handleDeleteEvent, handleSwitchCompleteTask } from "./script.js"

export function Task(task) {
  // Criando Li Tarefa
  let liTask = document.createElement('li')
  liTask.classList.add(task.completed ? 'task-completed' : 'task')
  liTask.id = `task-${task.id}`

  let taskInfo = TaskInfo(task)
  liTask.appendChild(taskInfo)

  let taskActions = TaskActions(task)
  liTask.appendChild(taskActions)

  return liTask
}

function TaskInfo(task) {
  // Infos da Tarefa
  let sectionTarefaInfo = document.createElement('section')
  sectionTarefaInfo.classList.add('task-info')

  let spanTitulo = document.createElement('span')
  spanTitulo.textContent = task.title
  sectionTarefaInfo.appendChild(spanTitulo)

  let pDescricao = document.createElement('p')
  pDescricao.textContent = task.description != null ? task.description : ''
  sectionTarefaInfo.appendChild(pDescricao)
  return sectionTarefaInfo
}

function TaskActions(task) {
  // Actions da Tarefa
  let botoesTarefa = document.createElement('div')
  botoesTarefa.classList.add('botoes')

  let checkboxCompletar = document.createElement('input')
  checkboxCompletar.setAttribute('type', 'checkbox')
  checkboxCompletar.id = `checkbox-${task.id}`
  checkboxCompletar.checked = task.completed
  checkboxCompletar.addEventListener('click', handleSwitchCompleteTask)
  
  botoesTarefa.appendChild(checkboxCompletar)

  let spanExcluir = document.createElement('span')
  spanExcluir.id = `delete_span-${task.id}`
  spanExcluir.addEventListener('click', handleDeleteEvent)

  let trashIcon = document.createElement('ion-icon')
  trashIcon.id = `delete_icon-${task.id}`
  trashIcon.setAttribute('name', 'trash-outline')

  spanExcluir.appendChild(trashIcon)
  botoesTarefa.appendChild(spanExcluir)
  return botoesTarefa
}