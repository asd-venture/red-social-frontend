import { useState } from 'react'
import { createPost } from '../apis/postsApi'
import '../styles/toPost.css'

const ToPost = ({id}) => {
    
    // Expresion regular para limitar los caracteres de lo usuarios
    const expresiones = {
        content: /^[a-zA-ZÀ-ÿ0-9\s\_\-\;\,\.\:\?\¿\!\¡]{1,500}$/ // letras, numero, guion, guion bajo y demas caracteres
    }

    const [buttonDisabled, setbuttonDisabled] = useState(true)

    const [datos, setDatos] = useState({ // Datos del usuario para postear
        content: '',
        useridpost: id,
        image: null
    })

    const [image, setImage] = useState(); // Obteniendo imagen para previsualizar

    // Contenido del post
    const handleSubmit = event=>{
        if (expresiones.content.test(event.target.value)) { // Comprobando los caracteres del input 
            setbuttonDisabled(false)
            setDatos({
                ...datos,
                [event.target.name] : event.target.value
            })
        }else{
            if(event.target.value == '' && image){
                setbuttonDisabled(false)
            }else{
                setbuttonDisabled(true)
            }
        }
    }

    // enviando los datos al servidor 
    const sendData = async event=>{ 
        if (!buttonDisabled) {
            let formData = new FormData()
            formData.append('content', datos.content)
            formData.append('useridpost', datos.useridpost)
            formData.append('image', datos.image)
            createPost(formData)
            event.target.reset()
        }else{
            alert('disallowed characters')
        }
    }

    // obteniendo las imagenes
    const upload = event=>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.files[0]
        })
        setbuttonDisabled(false)

        setImage(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <div className='toPost'>
            <h1> Make A Post!</h1>
            <form action='/home' onSubmit={sendData}>
                <textarea className={buttonDisabled ? 'contentError':''} name='content' placeholder='Write something' onChange={handleSubmit}/>
                {image&&
                    <div className='imageToPost'>
                        <img src={image} alt={image}/>
                    </div>
                }
                <br />
                <div className='photoFile'>
                    <label for='image' className='file'> 
                        Photo
                        <input type="file" name='image' id='image' accept='image/*' onChange={upload}/>
                    </label>
                    <button disabled={buttonDisabled}> Post </button>
                </div>
            </form>
        </div>
    )
}

export default ToPost