import Api from "./api";

export class GuestApi extends Api {

    static async getAll(filters = {}) {
        let url = new URL(`${this.baseUrl}/api/guests`);
        let params = new URLSearchParams();
        for (let key in filters) {
            params.append(key, filters[key]);
        }
        if(params.toString()) {
            url.search = params.toString();
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if(!response.ok) {
            throw new Error('Error while fetching guests');
        }
        return await response.json();
    }

    static async create(data) {
        const response = await fetch(`${this.baseUrl}/api/guests`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });
        if(!response.ok) {
            throw new Error('Error while creating stream');
        }
        return await response.json();
    }

    static async update(id, data) {
        const response = await fetch(`${this.baseUrl}/api/guests/${id}`, {
            method: 'PUT',
            headers: this.getHeaders({}),
            body: data,
        });
        if(!response.ok) {
            throw new Error('Error while creating stream');
        }
        return await response.json();
    }

    static async upload(data) {
        const response = await fetch(`${this.baseUrl}/api/guests/upload`, {
            method: 'POST',
            headers: this.getHeaders({}),
            body: data,
        });
        if(!response.ok) {
            throw new Error('Error while creating stream');
        }
        return await response.json();
    }

    static async delete(id) {
        const response = await fetch(`${this.baseUrl}/api/guests/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        if(!response.ok) {
            throw new Error('Error while deleting guest');
        }
    }

    static async getOne(id) {
        const response = await fetch(`${this.baseUrl}/api/guests/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        if(!response.ok) {
            throw new Error('Error while fetching guest');
        }
        return await response.json();
    }

}