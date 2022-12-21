import axios from 'axios'

const instance = axios.create({
    mode: 'cors',
    baseURL: import.meta.env.VITE_URL_API
})

export const usersApi = async ()=>{
    try {
        const response = await instance.get('/users');
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar las peticiones');
    }
}

export const userIDApi = async (id)=>{
    try {
        const response = await instance.get(`/users/id/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar las peticiones');
    }
}

export const userEmailApi = async (email)=>{
    try {
        const response = await instance.get(`/users/email/${email}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar las peticiones');
    }
}

export const createUser = async (body)=>{
    try {
        const response = await instance.post('/users', body)
        return response.data
    } catch (error) {
        throw new Error('Error al crear una publicacion');
    }
}