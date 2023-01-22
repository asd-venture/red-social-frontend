import { useState } from 'react'
import { createPost } from '../apis/postsApi'
import Load from './Load'
import '../styles/toPost.css'

const ToPost = ({id}) => {
    
    // Expresion regular para limitar los caracteres de lo usuarios
    const expresiones = {
        content: /^[\S\s]{1,500}$/ // letras, numero, guion, guion bajo y demas caracteres
    }

    const [loadingToPost, setLoadingToPost] = useState(false)
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
                setDatos({
                    ...datos,
                    [event.target.name] : event.target.value
                })
            }else{
                setbuttonDisabled(true)
            }
        }
    }

    // enviando los datos al servidor 
    const sendData = async event=>{
        event.preventDefault()
        if (!buttonDisabled) {
            setLoadingToPost(true)
            setbuttonDisabled(true)
            let formData = new FormData()
            formData.append('content', datos.content)
            formData.append('useridpost', datos.useridpost)
            formData.append('image', datos.image)
            createPost(formData).then(response=>{
                event.target.reset()
                window.location.href=import.meta.env.VITE_URL_DOMAIN+'/home'
            })
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
            <form onSubmit={sendData}>
                <textarea className={buttonDisabled ? 'contentError':''} name='content' placeholder='Write something' disabled={loadingToPost} onChange={handleSubmit}/>
                {image&&
                    <div className='imageToPost'>
                        <img src={image} alt={image}/>
                    </div>
                }
                <br />
                <div className='photoFile'>
                    <label for='image' className={loadingToPost ? 'fileDesactive':'file'}> 
                        Photo
                        <input type="file" name='image' id='image' accept='image/*' disabled={loadingToPost} onChange={upload}/>
                    </label>
                    { loadingToPost && <div><Load/></div> } 
                        
                    <button disabled={buttonDisabled}> Post </button>
                </div>
            </form>
        </div>
    )
}

export default ToPost