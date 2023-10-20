import {
buscar_tarefas, 
cadastrar_tarefa, 
deletar_tarefa,
gerar_card_tarefa,
buscar_tarefa_por_id, 
atualizar_tarefa} from './tarefas.js'


// Listar Tarefas
async function listar_tarefas() {
    const response = await buscar_tarefas()

    const tarefas = await response.json() 
    if (response.status != 200 || tarefas.lenght == 0) {
        return
    }

    const lista_tarefas = document.getElementById('tarefas')
    lista_tarefas.innerHTML = '';
    tarefas.map((tarefa) => {
        lista_tarefas.innerHTML += gerar_card_tarefa(tarefa) 
    })
    adicionar_excluir()
    adicionar_completar()
}

// Deletar Tarefa
function adicionar_excluir() {
    const delete_icons = Array.from(document.querySelectorAll('.excluir-tarefa'))
    delete_icons.map((trash_icon) => {
        trash_icon.addEventListener('click', async () => {
            await deletar_tarefa(trash_icon.id.split('-')[1])
            await listar_tarefas()
        })
    })
}

// Completar Tarefa
function adicionar_completar() {
    const checkboxs_completar = Array.from(document.querySelectorAll('.completar-tarefa'))
    checkboxs_completar.map((checkbox) => {
        checkbox.addEventListener('change', async () => {
            const tarefaId = checkbox.id.split('-')[1] // 'checkbox-id' -> ['checkbox', 'id']
            console.log(tarefaId)
            let tarefa = await (await buscar_tarefa_por_id(tarefaId)).json()
            
            const tarefa_card = document.getElementById(`tarefa-${tarefaId}`);
            if (checkbox.checked) {
                tarefa_card.className = 'tarefa-completa'
                tarefa.completa = true
            } else {
                tarefa_card.className = 'tarefa'
                tarefa.completa = false
            }
            
            await atualizar_tarefa(tarefa)
        })
    })
}

// Main
await listar_tarefas()

// Criar Tarefas
const formulario_criar_tarefa = document.querySelector('header form')
formulario_criar_tarefa.addEventListener('submit', async (event) => {
    event.preventDefault()

    const titulo = document.getElementById('tarefa-titulo').value
    if (titulo == null || titulo.trim() === '') {
        alert('Você precisa colocar um titulo para cadastrar uma tarefa!');
        return 
    }

    let descricao = document.getElementById('tarefa-descricao').value
    const nova_tarefa = {
        "titulo": titulo,
        "descricao": descricao != "" ? descricao : null
    }

    await cadastrar_tarefa(nova_tarefa)
    await listar_tarefas()
});

