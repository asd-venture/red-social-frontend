import { useState, useEffect, useReducer } from 'react'
import '../styles/comments.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Comments = ({postdata, userdata}) => {

  const [comments, setComments] = useState();
  const [reducerValue, forceUpdate] = useReducer( x => x + 1 , 0)

  const getApiData = async () => {
    const id = postdata.postid
    const url = `http://localhost:3000/comments/post/${id}`;
    const response = await fetch(url)
    .then(response=> response.json())
    .catch(e => {
      console.log('e', e)
    })
    
    setComments(response);
  }
  
  useEffect(()=>{
    getApiData();
  }, [reducerValue])

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

    const url = `http://localhost:3000/comments`;
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

    event.target.reset()
    forceUpdate()
}
  
  return (
    <div className='comments'>
      <h4> Comments </h4>
      <form onSubmit={sendData}>
        <input type="text" name='nota' placeholder='Comment something' onChange={handleSubmit}/>
        <button> Post </button>
      </form>
      <div className='boxComments'>
        {
        comments &&
          comments.message != 'The post does not exist or that post does not have any comment'?
            comments.map(lastComments=>(
                <div key={lastComments.commentid} className='comment'> 
                  <img src={lastComments.picture} className='usersPerfilPicture' onError={event=>{
                                event.target.src = perfilDefault
                                event.onerror = null
                            }}/>
                  <div>
                    <h5> {lastComments.username} </h5>
                    <p> {lastComments.nota} </p>
                  </div>
                    
                </div>
            ))
            :
            null
        }
      </div>
    </div>
  )
}

export default Comments