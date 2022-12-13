import axios from 'axios'

const instance = axios.create({
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