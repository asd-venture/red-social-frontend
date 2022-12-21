import axios from 'axios'

const instance = axios.create({
    mode: 'cors',
    baseURL: import.meta.env.VITE_URL_API
})

export const commentsPostApi = async (id)=>{
    try {
        const response = await instance.get(`/comments/post/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al cargar las peticiones');
    }
}

export const createComment = async (body)=>{
    try {
        const response = await instance.post('/comments', body)
        return response.data
    } catch (error) {
        throw new Error('Error al crear una publicacion');
    }
}