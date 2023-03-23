// Gerar Html
function gerar_card_tarefa(tarefa) {
    return `
        <li class="tarefa${tarefa.completa ? '-completa' : ''}" id="tarefa-${tarefa.id}">
            <section class="tarefas-info">
                <span> ${tarefa.titulo} </span>
                <p> ${tarefa.descricao != null ? tarefa.descricao : ''} </p>
            </section>
            <div class="botoes">
                <input type="checkbox" class="completar-tarefa" id="checkbox-${tarefa.id}"${tarefa.completa ? ' checked' : ''}>
                <img src="./public/images/trash-icon.png" alt="delete" class="excluir-tarefa" id="delete-${tarefa.id}">
            </div>
        </li>`
}

// Requisitando o Backend
const BASE_URL = 'http://127.0.0.1:8080'

async function buscar_tarefas() {
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`${BASE_URL}/tarefas`, request)
    return response
}

async function buscar_tarefa_por_id(id) {
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`${BASE_URL}/tarefas/${id}`, request)
    return response
}

async function cadastrar_tarefa(tarefa) {
    const request = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    }

    const response = await fetch(`${BASE_URL}/tarefas`, request)
    return response
}

async function deletar_tarefa(id) {
    const request = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(`${BASE_URL}/tarefas/${id}`, request)
    return response
}

async function atualizar_tarefa(tarefa) {
    const request = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    }

    const response = await fetch(`${BASE_URL}/tarefas/${tarefa.id}`, request)
    return response
}

export { 
    gerar_card_tarefa, 
    buscar_tarefas, 
    cadastrar_tarefa, 
    deletar_tarefa,
    buscar_tarefa_por_id,
    atualizar_tarefa
}