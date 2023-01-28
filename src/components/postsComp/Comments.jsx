import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { commentsPostApi, createComment } from '../../apis/commentsApi'
import Load from '../Load'
import '../../styles/postsComp/comments.css'
import perfilDefault from '../../assets/perfilDefault.webp'

const Comments = ({postdata}) => {

  const { user } = useAuth0();
  const {data: userdata} = useQuery(['userEmailData', user.email], ()=>userEmailApi(user.email));
  const {data: comments, error, isLoading, refetch} = useQuery(['commentsPostData', postdata.postid], ()=>commentsPostApi(postdata.postid));

  // Expresion regular para limitar los caracteres de lo usuarios
  const expresiones = {
    content: /^[a-zA-ZÀ-ÿ0-9\s\_\-\;\,\.\:\?\¿\!\¡]{1,500}$/ // letras, numero, guion y guion bajo
  }

  const [buttonDisabled, setbuttonDisabled] = useState(true)

  const [datos, setDatos] = useState({
    nota: '',
    useridcomment: userdata.userid,
    postidcomment: postdata.postid
  })

  const handleSubmit = event=>{
    if (expresiones.content.test(event.target.value)) { // Comprobando los caracteres del input 
      setbuttonDisabled(false)
      setDatos({
          ...datos,
          [event.target.name] : event.target.value
      })
    }else{
      setbuttonDisabled(true)
    }
  }

  const sendData = async event=>{
    event.preventDefault()
    if (!buttonDisabled) {
      createComment(datos).then(response=>refetch())
      event.target.reset()
    } else{
      alert('Caracteres no permitidos')
    }
}

if(error) return <h1 className='error'>Something was wrong</h1>


return (
    <div className='comments'>
      <h4> Comments </h4>
      <form onSubmit={sendData}>
        <input type="text" className={buttonDisabled?'notaError':''} name='nota' placeholder='Comment something' onChange={handleSubmit}/>
        <button disabled={buttonDisabled}> Post </button>
      </form>

      <div className='boxComments'>
      {
        isLoading?
          <div className='commentsLoad'><Load/></div>
        :
          comments.map(lastComments=>(
            <Link to={lastComments.email == user.email ? '/profile' : '/profile/'+lastComments.email} key={lastComments.commentid} className='comment'>
              <img src={lastComments.picture} className='usersPerfilPicture' onError={event=>{
                event.target.src = perfilDefault
                event.onerror = null
              }}/>
              <div>
                <h5 className={postdata.email == user.email ? '':'logUser'}> {lastComments.username} </h5>
                <p> {lastComments.nota} </p>
              </div>

            </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Comments