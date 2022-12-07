import { useState, useEffect, useReducer } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'


const Post = ({postdata, userdata, confDelete}) => {
    
    const { user } = useAuth0();
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isCommentActive, setIsCommentActive] = useState(false);
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [like, setLike] = useState();
    const [likeCounter, setLikeCounter] = useState();
    const [reducerValue, forceUpdate] = useReducer( x => x + 1 , 0)

    
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

        forceUpdate()
    }

    const getLikeId = async()=>{
        const url = 'http://localhost:3000/likes';
        const response = await fetch(url)
        .then(response => response.json())
        .then(response=> response.map((likes)=>(
            userdata.userid==likes.useridlike && postdata.postid==likes.postidlike?
            setLike(likes)
                :
            null
        )))
        .catch(e => {
            console.log('e', e);
        })
    }

    const deleteLike = async()=>{

        const id = like.likeid
        const url = `http://localhost:3000/likes/${id}`;
        const response = await fetch(url, {
        method: 'DELETE', 
        mode: 'cors'
        })
        .then(response => response.json())
        .catch(e => {
            console.log('e', e);
        })
        
        forceUpdate()
    }
    
    const handleClickLike = ()=>{        
        setIsLikeActive(current => !current)
        isLikeActive ? deleteLike(): addData();
    }

    const handleClickComment = ()=>{        
        setIsCommentActive(current => !current)
    }

    const handleClickDeletePost = ()=>{
        setIsDeleteActive(current => !current)
    }

    const getUserLikes = async()=>{
        const id = userdata.userid
        const url = `http://localhost:3000/likes/user/${id}`;
        const response = await fetch(url)
        .then(response=> response.json())
        .then(response=> response.map((userlikes)=>(
            userlikes.postidlike==postdata.postid?
                setIsLikeActive(true)
                :
                null
        )))
        .catch(e => {
            console.log('e', e)
        })
    }

    const getPostLikes = async ()=>{
        const id = postdata.postid
        const url = `http://localhost:3000/likes/post/${id}`;
        const response = await fetch(url)
        .then(response=> response.json())
        .catch(e => {
            console.log('e', e)
        })

        setLikeCounter(response.posts)
    }

    const deletePost = async()=>{

        const id = postdata.postid
        const url = `http://localhost:3000/posts/${id}`;
        const response = await fetch(url, {
        method: 'DELETE', 
        mode: 'cors'
        })
        .then(response => response.json())
        .catch(e => {
            console.log('e', e);
        })
    }

    useEffect(()=>{
        getLikeId();
        userdata &&(getUserLikes())
        postdata &&(getPostLikes())
    }, [reducerValue]);

    return (
        <div className='postBox'>  
            <div className='perfilEdit'>
                <Link to={postdata.email == user.email ? '/profile' : '/profile/'+postdata.userid} className='userPost'>
                    <img src={postdata.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>

                    <div className='nameEmail'>
                        <p className='name' >{postdata.username}</p>
                        <p className='email'>{postdata.email}</p>
                    </div>
                </Link>
                { confDelete ? 
                    <p className='delete' onClick={handleClickDeletePost}> ... 
                        {isDeleteActive ?
                            <p className='deleteBotton' onClick={deletePost}> delete </p>
                            :
                            null
                        }
                    </p> 
                    : 
                    null 
                }
            </div>       
            <p className='contentPost'>{postdata.content}</p>
            <div className='LikeComment'>
                <button className={ isLikeActive ? 'likeActive' : 'like'} 
                    onClick={handleClickLike}
                >Like { likeCounter && <pre> {Object.keys(likeCounter).length} </pre> } </button> 
                <button onClick={handleClickComment}>Comment</button>
            </div>
            { 
                isCommentActive &&(
                    <Comments className='hide' postdata={postdata} userdata={userdata}/>
                )
            }
        </div>
    )
}

export default Post