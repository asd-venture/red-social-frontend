import { useState } from 'react'
import { createPost } from '../apis/postsApi'
import '../styles/toPost.css'

const ToPost = ({id}) => {

    const [datos, setDatos] = useState({
        content: '',
        useridpost: id,
        image: null
    })

    console.log(datos)
    const [image, setImage] = useState();

    const handleSubmit = event=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const sendData = async event=>{
        let formData = new FormData()
        formData.append('content', datos.content)
        formData.append('useridpost', datos.useridpost)
        formData.append('image', datos.image)
        createPost(formData)
        event.target.reset()
    }

    const upload = event=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.files[0]
        })

        setImage(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <div className='toPost'>
            <h1> Make A Post!</h1>
            <form action='/home' onSubmit={sendData}>
                <input type="file" name='image' accept='image/jpeg' onChange={upload}/>
                <input type="text" name='content' placeholder='Write something' onChange={handleSubmit}/>
                {image&&
                    <div className='imageToPost'>
                        <img src={image} alt={image}/>
                    </div>
                }
                <br />
                <button> Post </button>
            </form>
        </div>
    )
}

export default ToPost