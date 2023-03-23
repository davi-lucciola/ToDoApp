import uvicorn
from http import HTTPStatus
from fastapi import FastAPI, Response
from config import criar_tabelas
from fastapi.middleware.cors import CORSMiddleware
from models.tarefa import Tarefa


# Api
app = FastAPI (
    title='To Do App', 
    description='Um aplicativo para cadastrar tarefas e marcar quando forem finalizadas'
)


# Endpoints
@app.get('/tarefas')
async def listar_tarefas() -> list[Tarefa]:
    return await Tarefa.objects.all()

@app.get('/tarefas/{id}')
async def detalhar_tarefa(id: int) -> Tarefa:
    return await Tarefa.objects.get(id = id)

@app.put('/tarefas/{id}')
async def alterar_tarefa(id: int, tarefa: Tarefa) -> Response:
    tarefa.id = id
    await tarefa.update()
    return Response(status_code=HTTPStatus.CREATED)

@app.delete('/tarefas/{id}')
async def deletar_tarefa(id: int) -> Response:
    await Tarefa.objects.delete(id=id)
    return Response(status_code=HTTPStatus.ACCEPTED) 

@app.post('/tarefas')
async def criar_tarefa(tarefa: Tarefa) -> Response:
    await tarefa.save()
    return Response(status_code=HTTPStatus.OK)

# Configurando Cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:5500'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações de Servidor
if __name__ == '__main__':
    criar_tabelas()
    uvicorn.run(
        'main:app',
        host='localhost',
        port=8080,
        reload=True
    )
