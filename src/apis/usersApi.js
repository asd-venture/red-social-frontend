import axios from 'axios'

const instance = axios.create({
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