import { useState } from 'react'
import { createPost } from '../apis/postsApi'
import '../styles/toPost.css'

const ToPost = ({id}) => {

    const [datos, setDatos] = useState({
        content: '',
        useridpost: id
    })

    const handleSubmit = event=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const sendData = async event=>{
        createPost(datos)
        event.target.reset()
    }

    return (
        <div className='toPost'>
            <h1> Make A Post!</h1>
            <form action='/home' onSubmit={sendData}>
                <input type="text" name='content' placeholder='Write something' onChange={handleSubmit}/>
                <br />
                <button> Post </button>
            </form>
        </div>
    )
}

export default ToPost