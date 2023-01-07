import axios from 'axios'

const instance = axios.create({
    mode: 'cors',
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const postsApi = async (load=1)=>{
    try {
        const response = await instance.get(`/posts?page=${load}&size=5`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Erro al cargar las peticiones');
    }
}

export const postsUserApi = async (id, load)=>{
    try {
        const response = await instance.get(`/posts/user/${id}?page=${load}&size=5`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar las peticiones');
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

export const deletePost = async (id)=>{
    try {
        const response = await instance.delete(`/posts/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar el post');
    }
}