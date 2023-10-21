export class TaskService {
    constructor(httpClient) {
        this.api = httpClient
    }

    async findAll() {
        const response = await this.api.get('/tarefa')
        return response
    }

    async findById(taskId) {
        const response = await this.api.get(`/tarefa/${taskId}`)
        return response
    }

    async create(task) {
        if (task.description == '') { task.description = null }
        

        const response = await this.api.post('/tarefa', task)
        return response
    }

    async update(task) {
        const response = await this.api.put(`/tarefa/${task.id}`, task)
        return response
    }

    async delete(taskId) {
        const response = await this.api.delete(`/tarefa/${taskId}`)
        return response
    }
}