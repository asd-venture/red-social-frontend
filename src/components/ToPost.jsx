import { useState, useEffect } from 'react'
import '../styles/toPost.css'

const ToPost = ({id}) => {

    const [datos, setDatos] = useState({
        content: '',
        userid: id
    })
    const [postUser, setPostUser] = useState();

    const handleSubmit = event=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const sendData = async evemt=>{
        // evemt.preventDefault()
        const url = "http://localhost:3000/posts";
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .catch(e => {
        console.log('e', e);
        })

        setPostUser(response);

        evemt.target.reset()
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