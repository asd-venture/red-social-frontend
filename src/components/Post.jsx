import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom"
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'

const url = "http://localhost:3000/likes";

const Post = ({postdata}) => {

    const { user } = useAuth0();
    const [isActive, setIsActive] = useState(false);

    const [datos, setDatos] = useState({
        useridlike: '',
        postidlike: postdata.postid,
    })

    const apiData = async ()=>{
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(e => {
          console.log('e', e);
        })
    
        setId(response);
    }

    const deleteData = async()=>{

        
    }
    
    const handleClickLike = ()=>{
        setIsActive(current => !current)

        // isActive ? 
        //     apiData()
        //     :
    }

    return (
        <div key={postdata.id} className='postBox'>
            {postdata.email == user.email ? 
                <Link to='/profile' className='userPost'>
                    <img src={postdata.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>

                    <div className='nameEmail'>
                        <p>{postdata.username}</p>
                        <p>{postdata.email}</p>
                    </div>
                </Link>
                            :
                <Link to={'/profile/'+postdata.userid} className='userPost'>
                    <img src={postdata.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>

                    <div className='nameEmail'>
                        <p>{postdata.username}</p>
                        <p>{postdata.email}</p>
                    </div>
                </Link>
            }

            <p className='contentPost'>{postdata.content}</p>
            <div className='LikeComment'>
                <button className={ isActive ? 'likeActive' : 'like'} 
                    onClick={handleClickLike}
                >Like</button> 
                <button>Comment</button>
            </div>
        </div>
    )
}

export default Post