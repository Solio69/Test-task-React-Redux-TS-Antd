import { IUser } from '../types/types';

class ApiService {
  baseStr = 'https://621c7b30768a4e1020ab3244.mockapi.io/api';

  async putUserUpdate (id:string, newUserData:IUser) {
    const body = {
      age: newUserData.age,
      name: newUserData.name,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.baseStr}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });

    return response.json();
  }

  async deleteUser (id:string) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.baseStr}/users/${id}`, {
      method: 'DELETE',
      headers,
    });

    return response.json();
  }
}

const apiService = new ApiService();

export { apiService };
