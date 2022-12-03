import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom"
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'


const Post = ({postdata, userdata}) => {
    
    const { user } = useAuth0();
    const [isActive, setIsActive] = useState(false);
    const [likeId, setLikeId] = useState();
    const [ likeUser, setLikeUser] = useState();
    const [likeCounter, setLikeCounter] = useState();
    
    const addData = async()=>{
        const url = "http://localhost:3000/likes";
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            useridlike: userdata.userid,
            postidlike: postdata.postid,
        })
        })
        .then(response => response.json())
        .catch(e => {
          console.log('e', e);
        })

        setLikeId(response)
    }

    const deleteData = async()=>{
        const id = likeId.like.likeid
        const url = `http://localhost:3000/likes/${id}`;
        const response = await fetch(url, {
            method: 'DELETE', 
            mode: 'cors'
            })
            .then(response => response.json())
            .catch(e => {
                console.log('e', e);
            })
    }
    
    const handleClickLike = ()=>{        
        setIsActive(current => !current)
        isActive ? deleteData(): addData();
    }

    const getUserLikes = async()=>{
        const id = userdata.userid
        const url = `http://localhost:3000/likes/user/${id}`;
        const response = await fetch(url)
        .then(response=> response.json())
        .catch(e => {
            console.log('e', e)
        })

        response.map((userlikes)=>(
            userlikes.postidlike==postdata.postid?
                setIsActive(true)
                :
                null
        ))
    }

    const getPostLikes = async ()=>{
        const id = postdata.postid
        const url = `http://localhost:3000/likes/post/${id}`;
        const response = await fetch(url)
        .then(response=> response.json())
        .catch(e => {
            console.log('e', e)
        })

        setLikeCounter(response)
    }

    useEffect(()=>{
        getUserLikes();
        getPostLikes();
    }, []);

    return (
        <div className='postBox'>
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
                >Like { likeCounter && <pre> {Object.keys(likeCounter).length} </pre> } </button> 
                <button>Comment</button>
            </div>
        </div>
    )
}

export default Post