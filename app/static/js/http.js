export class HttpClient {
  constructor(base_url) {
    this.base_url = base_url
  }

  async get(endpoint) {
    const request = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    } 

    return fetch(`${this.base_url}${endpoint}`, request)  
  }

  async post(endpoint, body) {
    const request = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    
    return fetch(endpoint, request)
  }

  async put(endpoint, body) {
    const request = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    
    return fetch(endpoint, request)
  }

  async delete(endpoint) {
    const request = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    } 

    return fetch(`${this.base_url}${endpoint}`, request)  
  }
}
