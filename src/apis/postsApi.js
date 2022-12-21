import axios from 'axios'

const instance = axios.create({
    mode: 'cors',
    baseURL: import.meta.env.VITE_URL_API
})

export const postsApi = async ()=>{
    try {
        const response = await instance.get('/posts');
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al cargar las peticiones');
    }
}

export const postsUserApi = async (id)=>{
    try {
        const response = await instance.get(`/posts/user/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al cargar las peticiones');
    }
}

export const createPost = async (body)=>{
    try {
        const response = await instance.post('/posts', body)
        return response.data
    } catch (error) {
        throw new Error('Error al crear una publicacion');
    }
}