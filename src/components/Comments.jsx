import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { commentsPostApi, createComment } from '../apis/commentsApi'
import '../styles/comments.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Comments = ({postdata, userdata}) => {

  const { user } = useAuth0();
  const {data: comments, error, isLoading, refetch} = useQuery(['commentsPostData', postdata.postid], ()=>commentsPostApi(postdata.postid));

  const [datos, setDatos] = useState({
    nota: '',
    useridcomment: userdata.userid,
    postidcomment: postdata.postid
  })

  const handleSubmit = event=>{
      setDatos({
          ...datos,
          [event.target.name] : event.target.value
      })
  }

  const sendData = async event=>{
    event.preventDefault()

    createComment(datos).then(response=>refetch())

    event.target.reset()
}

  if(isLoading) return <h1 className='loading'> loading...</h1> 
  if(error) return <h1 className='error'>Something was wrong</h1>

  return (
    <div className='comments'>
      <h4> Comments </h4>
      <form onSubmit={sendData}>
        <input type="text" name='nota' placeholder='Comment something' onChange={handleSubmit}/>
        <button> Post </button>
      </form>
      <div className='boxComments'>
        {
        comments.map(lastComments=>(
            <Link to={lastComments.email == user.email ? '/profile' : '/profile/'+lastComments.email} key={lastComments.commentid} className='comment'>
              <img src={lastComments.picture} className='usersPerfilPicture' onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>
              <div>
                <h5> {lastComments.username} </h5>
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