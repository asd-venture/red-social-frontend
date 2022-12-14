import axios from 'axios'

const instance = axios.create({
    mode: 'cors',
    baseURL: import.meta.env.VITE_URL_API
})

export const postLikesApi = async (id)=>{
    try {
        const response = await instance.get(`/likes/post/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al cargar las peticiones');
    }
}

export const createLike = async (body)=>{
    try {
        const response = await instance.post('/likes', body)
        return response.data
    } catch (error) {
        throw new Error('Error al darle like a una publicacion');
    }
}

export const deleteLike = async (id)=>{
    try {
        const response = await instance.delete(`/likes/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al eliminar el like');
    }
}